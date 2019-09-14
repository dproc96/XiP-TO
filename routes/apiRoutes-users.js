var db = require("../models");

module.exports = function (app) {

  // Create a user
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function(result) {
      res.json(result);
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

  // Update a user
  app.put("/api/users", function (req, res) {
    // if (!req.session.loggedin) {
    //   res.status(500).end("You need to sign in to update a user.");
    // }

    db.User.update(req.body,{where:{id: req.body.id}}).then(function(result) {
      res.json(result);
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
