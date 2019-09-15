// var db = require("../models");
let metadata = require("../config/metadata");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
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
  app.get("/experiences/:id", function(req, res) {
    if (req.params.id === "new") {

      //load categories from the database
      metadata.loadCategories().then(data => {
        metadata.categories = data;
        res.render("new-experience", { metadata: metadata });
      });
      
    }
    else {
      
      db.Experience.findByPk(req.params.id).then(function (experience) {
        //load categories from the database
        metadata.loadCategories().then(function(data) {
          
          metadata.categories = data;
          metadata.experience = experience;
          res.render("new-experience", { metadata: metadata, experience: experience });
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

  app.get("/users/", function (req, res) {
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.redirect("/");
  });
};
