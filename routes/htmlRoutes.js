// var db = require("../models");
let metadata = require("../config/metadata");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Experience.findAll({
      include: [{ all: true }],
      order: [["createdAt", "DESC"], ["CategoryId", "ASC"]],
      where: {
        active: true
      }
    }).then(function (results) {
      metadata.loadCategories().then(categories => {
        metadata.categories = categories;
        let data = {
          metadata: metadata,
          categories: []
        };
        if (!req.session.loggedin) {
          metadata.buttons = metadata.buttonsLoggedOut.filter(x => { return x.id !== "home"; });
        }
        else {
          metadata.buttons = metadata.buttonsLoggedIn.filter(x => { return x.id !== "home"; });
        }
        for (let category of metadata.categories) {
          let categoryData = {
            name: category.name,
            elements: results.filter((x) => { return x.Category.name === category.name; })
          };
          if (categoryData.elements.length > 0) {
            data.categories.push(categoryData);
          }
        }
        res.render("index", data);
      });
    }).catch(err => {
      if (err.errors) {
        res.status(500).end(err.errors[0].message);
      }
      else {
        console.log(err);
        res.status(500).end(err.message);
      }
    });
  });

  // Load experience form page and pass an experience id
  app.get("/experiences/:id", function (req, res) {
    if (req.params.id === "new") {

      //load categories from the database
      metadata.loadCategories().then(data => {
        if (!req.session.loggedin) {
          metadata.buttons = metadata.buttonsLoggedOut;
        }
        else {
          metadata.buttons = metadata.buttonsLoggedIn;
        }
        metadata.categories = data;
        res.render("new-experience", { metadata: metadata });
      });

    }
    else {

      db.Experience.findByPk(req.params.id).then(function (experience) {
        //load categories from the database
        metadata.loadCategories().then(function (categories) {
          metadata.categories = categories;
          if (!req.session.loggedin) {
            metadata.buttons = metadata.buttonsLoggedOut;
          }
          else {
            metadata.buttons = metadata.buttonsLoggedIn;
          }
          metadata.experience = experience;
          if (req.session.UserId === experience.UserId && req.query.q === "edit") {
            res.render("new-experience", { metadata: metadata, experience: experience });
          }
          else {
            res.redirect("/");
          }
        });

      }).catch(err => {
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        }
        else {
          res.status(500).end(err.message);
        }
      });


    }
  });

  app.get("/profile", function (req, res) {
    let userId;
    //check if the user is logged in
    if (!req.session.loggedin) {
      res.redirect("/");
    }
    else {

      userId = req.session.UserId;

      db.User.findOne({
        where: {
          id: userId
        },
        include: [{ all: true }]
      }).then(function (results) {
        if (!req.session.loggedin) {
          metadata.buttons = metadata.buttonsLoggedOut.filter(x => { return x.id !== "my-page"; });
        }
        else {
          metadata.buttons = metadata.buttonsLoggedIn.filter(x => { return x.id !== "my-page"; });
        }
        res.render("profile", { metadata: metadata, user: results });
      }).catch(err => {
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        }
        else {
          res.status(500).end(err.message);
        }
      });
    }

  });

  app.get("/users/:id", function (req, res) {
    let userId = req.params.id;

    if (parseInt(userId) === req.session.UserId) {
      res.redirect("/profile");
    }

    else {
      db.User.findOne({
        where: {
          id: userId
        },
        include: [{ all: true }]
      }).then(function (results) {
        if (!req.session.loggedin) {
          metadata.buttons = metadata.buttonsLoggedOut;
        }
        else {
          metadata.buttons = metadata.buttonsLoggedIn;
        }
        res.render("user", { metadata: metadata, user: results });
      }).catch(err => {
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        }
        else {
          res.status(500).end(err.message);
        }
      });
    }

  });

  app.get("*", function (req, res) {
    res.redirect("/");
  });
};
