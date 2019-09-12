var db = require("../models");

module.exports = function (app) {
  /*************
   * CATEGORIES
   *************/

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
      res.status(500).end(err.errors[0].message);
    });
  });

  /*************
   * EXPERIENCES
   *************/

  // Get all experiences that are active
  app.get("/api/experiences", function(req, res) {
    db.Experience.findAll({
      include: [{all:true}],
      order: [["CategoryId", "ASC"]],
      where: {
        active: true
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => {
      console.log(err);
      //res.status(500).end(err.errors[0].message);
      res.status(500).end();
    });
  });

  // Get an experience
  app.get("/api/experiences/:experienceid", function(req, res) {
    db.Experience.findOne({
      include: [db.Review, db.User],
      order: [["CategoryId", "ASC"]],
      where: {
        id: req.params.experienceid
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  // Get all experiences that are active from an user
  app.get("/api/experiences/user/:userid", function(req, res) {
    db.Experience.findOne({
      include: [db.Review, db.User],
      order: [["CategoryId", "ASC"]],
      where: {
        UserId: req.params.userid,
        active: true
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  // Create an experience
  app.post("/api/experiences", function(req, res) {
    db.Experience.create(req.body).then(function(result) {
      res.json(result);
    }).catch(err => {
      console.log(err);
      //res.status(500).end(err.errors[0].message);
      res.status(500).end();
    });
  });

  // Update an experience
  app.put("/api/experiences", function(req, res) {
    db.Experience.update(req.body,{where:{id: req.body.id}}).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  // Delete an experience by id (actually just change the active field to false)
  app.delete("/api/experiences/:id", function(req, res) {
    db.Experience.update({
      active: false
    },
    {
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  /*************
   * REVIEWS
   *************/

  // Get all reviews that are active from an experience
  app.get("/api/reviews/experience/:experienceid", function(req, res) {
    db.Review.findAll({
      include: [{all: true}],
      order: [["createdAt", "DESC"]],
      where: {
        active: true,
        ExperienceId: req.params.experienceid
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => {
      console.log(err);
      //res.status(500).end(err.errors[0].message);
      res.status(500).end();
    });
  });

  // Create a review
  app.post("/api/reviews", function(req, res) {
    db.Review.create(req.body).then(function (result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  // Update a review
  app.put("/api/reviews", function(req, res) {
    db.Review.update(req.body,{where:{id: req.body.id}}).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  /*************
   * USERS
   *************/

  // Create a user
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  // Update a user
  app.put("/api/users", function(req, res) {
    db.User.update(req.body,{where:{id: req.body.id}}).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });
};
