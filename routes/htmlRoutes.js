// var db = require("../models");
let metadata = require("../config/metadata");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Experience.findAll({
      include: [{ all: true }],
      order: [["createdAt", "DESC"], ["CategoryId", "ASC"]]
    }).then(function (results) {
      metadata.loadCategories().then(categories => {
        metadata.categories = categories;
        metadata.userLoggedIn = req.session.loggedin;
        let data = {
          metadata: metadata,
          categories: []
        };
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
        res.status(500).end(err.message);
      }
    });
  });

  // Load experience form page and pass an experience id
  app.get("/experiences/:id/:edit?", function (req, res) {
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
        metadata.userLoggedIn = req.session.loggedin;
        res.render("experience-form", { metadata: metadata });
      });

    }
    else {
      //load experience
      db.Experience.findOne({
        where: {
          id: req.params.id
        },
        include: {all: true}
      }).then(function (experience) {
        //if experience was found
        if (experience) {
          //load categories from the database
          metadata.loadCategories().then(function (categories) {
            metadata.categories = categories;
            metadata.userLoggedIn = req.session.loggedin;
            metadata.experience = experience;
          
            if (req.session.UserId === experience.UserId && req.params.edit) {
              res.render("experience-form", { metadata: metadata, experience: experience });
            }
            else {
              let options = { metadata: metadata, experience: experience };
              if (req.session.UserId === experience.UserId) {
                options.user = true;
              }
              res.render("view-experience", options);
            }
          });
        }
        else {
          res.redirect("/");
        }
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
        metadata.userLoggedIn = req.session.loggedin;
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
        metadata.userLoggedIn = req.session.loggedin;
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
