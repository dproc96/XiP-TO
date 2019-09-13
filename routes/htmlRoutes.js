var db = require("../models");
var metadata = require("../config/metadata");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {metadata: metadata});
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
