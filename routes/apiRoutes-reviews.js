var db = require("../models");

module.exports = function (app) {

  // Get all reviews that are active from an experience
  app.get("/api/reviews/experience/:experienceid", function(req, res) {
    db.Review.findAll({
      include: [{all:true}],
      order: [["createdAt", "DESC"]],
      where: {
        active: true,
        ExperienceId: req.params.experienceid
      }
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

  // Create a review
  app.post("/api/reviews", function(req, res) {
    db.Review.create(req.body).then(function (result) {
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

  // Update a review
  app.put("/api/reviews", function(req, res) {
    db.Review.update(req.body,{where:{id: req.body.id}}).then(function(result) {
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
