var db = require("../models");

module.exports = function(app) {
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

  // Get all experiences that are active
  app.get("/api/experiences", function(req, res) {
    db.Experience.findAll({
      include: [db.Review, db.User],
      order: [["CategoryId", "ASC"]],
      where: {
        active: true
      }
    }).then(function (data) {
      res.json(data);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
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

  // Get all user experiences that are active
  app.get("/api/user/experiences/:userid", function(req, res) {
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
      res.status(500).end(err.errors[0].message);
    });
  });

  // Update an experience
  app.put("/api/experiences", function(req, res) {
    db.Experience.update(req.body).then(function(result) {
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

  // Create a review
  app.post("/api/reviews", function(req, res) {
    db.Review.create(req.body).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

  // Update a review
  app.put("/api/reviews", function(req, res) {
    db.Review.update(req.body).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });

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
    db.Update.update(req.body).then(function(result) {
      res.json(result);
    }).catch(err => {
      res.status(500).end(err.errors[0].message);
    });
  });
};
