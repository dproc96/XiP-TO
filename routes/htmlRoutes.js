var db = require("../models");
var metadata = require("../config/metadata");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/experiences/:id", function(req, res) {
    if (req.param.id = "new") {
      res.render("new-experience", {metadata: metadata});
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.redirect("/");
  });
};
