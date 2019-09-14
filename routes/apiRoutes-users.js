var db = require("../models");
const bcrypt = require("bcrypt");

module.exports = function (app) {

  // Create a user
  app.post("/api/users", function (req, res) {

    var pwd;
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

  // Update a user
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

    db.User.update(req.body,{where:{id: req.body.id}}).then(function(result) {
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
};
