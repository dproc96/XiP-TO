// var db = require("../models");
var metadata = require("../config/metadata");

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
        console.log(data);
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
    if (req.param.id = "new") {

      //load categories from the database
      metadata.loadCategories().then(data => {
        metadata.categories = data;
        res.render("new-experience", { metadata: metadata });
      });
      
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.redirect("/");
  });
};
