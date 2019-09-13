var db = require("../models");

module.exports = function (app) {

  // Get all categories that are active
  app.get("/api/categories", function(req, res) {
    db.Category.findAll({
      where: {
        active: true
      },
      order: [["name", "ASC"]]
    }).then(function (data) {
      res.json(data);
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

};
