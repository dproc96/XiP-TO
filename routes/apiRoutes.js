var db = require("../models");

module.exports = function(app) {
  app.get("/api/experiences/:id?", function(request, response) {
    if (request.params.id) {
      db.Experiences.findOne({
        where: {
          id: request.params.id
        }
      }).then(function(results) {
        if (results.data.length === 0) {
          response.status(400).end();
        }
        response.json(results);
      }).catch(function(error) {
        response.status(503).json(error);
      });
    } else {
      db.Experiences.findAll().then(function(results) {
        response.json(results);
      }).catch(function(error) {
        console.log(error);
        response.status(503).end();
      });
    }
  });

  app.post("/api/experiences/new", function(request, response) {
    let data = request.body;
    // Add logic for determining correct data structure in place of true
    if (true) {
      // Add object for creating when database structure is known
      db.Experiences.create({data}).then(function(results) {
        console.log(results);
        response.status(200).end();
      }).catch(function(error) {
        console.log(error);
        response.status(503).end();
      });
    } else {
      response.status(400).end();
    }
  });

  app.put("/api/experiences/:id", function(request, response) {
    let data = request.body;
    // Add logic for determining correct data structure in place of true
    if (true) {
      // Add object for updating when database structure is known
      db.Experiences.update({data}, {
        where: {
          id: request.params.id
        }
      }).then(function(results) {
        if (results.affectedRows === 0) {
          response.status(404).end();
        }
        response.status(200).end();
      }).catch(function(error) {
        console.log(error);
        response.status(503).end();
      });
    } else {
      response.status(400).end();
    }
  });
};
