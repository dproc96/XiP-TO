let db = require("../models");

module.exports = function (app) {

  // Get all reviews from an experience
  app.get("/api/reviews/experience/:experienceid", function(req, res) {
    db.Review.findAll({
      include: [{all:true}],
      order: [["createdAt", "DESC"]],
      where: {
        ExperienceId: req.params.experienceid
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => {
      if (err.errors) {
        res.status(400).end(err.errors[0].message);
      }
      else {
        res.status(500).end(err.message);
      }
    });
  });

  // Create a review
  app.post("/api/reviews", function (req, res) {
    //check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to create a review.");
    }
    else {
      //set the user id from the session
      req.body.UserId = req.session.UserId;
    
      db.Review.create(req.body).then(function (result) {
        res.json(result);
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

  // Update a review
  app.put("/api/reviews", function (req, res) {
    //check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update an review.");
    }
    else {
    
      db.Review.update(req.body, { where: { id: req.body.id } }).then(function (result) {
        res.json(result);
      }).catch(err => {
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        }
        else {
          console.log(err);
          res.status(500).end(err.message);
        }
      });
    }
  });
};
