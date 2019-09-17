let db = require("../models");
const bcrypt = require("bcrypt");

module.exports = function (app) {

  // Authenticate an user
  app.post("/api/auth", function (req, res) {
    
    try {
      //check if the required fields are empty
      if (req.body.email.trim() === "" || req.body.password.trim() === "") {
        res.status(400).end("E-mail and/or Password must be informed!");        
      }      
    }
    catch (e) {
      res.status(500).end("email and password fields must be passed!");
    }
    
    //find the user by email in the database
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      
      if (user) {
        //compare the password sent with the hash stored in the database 
        if(bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          req.session.loggedin = true;
          req.session.UserId = user.id;
          req.session.UserName = user.firstname;
          req.session.UserImage = user.image;
          res.status(200).end("User has signed up successfully!");
            
        } else {
          // Passwords don't match
          res.status(400).end("Incorrect Username and/or Password!");    
        }
        
      }
      else {
        res.status(400).end("User was not found!");    
      }
    }).catch(err => {
      if (err.errors) {
        res.status(400).end(err.errors[0].message);
      }
      else {
        res.status(500).end(err.message);
      }
    });
  });

  //Log out the user
  app.post("/api/logout", function (req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error destroying session:");
        console.log(err);
      }
      else {
        res.status(200).end("User was signed out successfully!");  
      }
    });
  });
  
};
