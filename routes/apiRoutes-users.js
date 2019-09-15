let db = require("../models");
const bcrypt = require("bcrypt");

module.exports = function (app) {

  // Create an user
  app.post("/api/users", function (req, res) {

    let pwd;
    //checks if the password field was passed
    try{
      pwd = req.body.password.trim();
    }
    catch (e) {
      console.log("The password field is expected!");
      res.status(500).end("The password field is expected!");        
    }

    //password validations
    if (pwd === "") {
      res.status(500).end("Password must be informed!");        
    }
    if (pwd.length < 8) {
      res.status(500).end("Password must have at least 8 characters!");        
    }

    //crypt the password
    req.body.password = bcrypt.hashSync(pwd, 10);
    
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

  // Update an user
  app.put("/api/users", function (req, res) {
    
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(500).end("You need to sign in to update a user.");
    }

    //checks if the password field was passed
    try{
      pwd = req.body.password.trim();
      //password validations
      if (pwd === "") {
        res.status(500).end("Password must be informed!");        
      }
      if (pwd.length < 8) {
        res.status(500).end("Password must have at least 8 characters!");        
      }

      //crypt the password
      req.body.password = bcrypt.hashSync(pwd, 10);
    }
    catch (e) {
      //nothing to do, but the password won't be updated
    }    

    db.User.update(req.body,{where:{id: req.body.id}}).then(function() {
      res.status(200).end("User has updated successfully!");
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

  // Get all users
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (data) {
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

  // Get an user
  app.get("/api/users/:userid", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.userid
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

};
