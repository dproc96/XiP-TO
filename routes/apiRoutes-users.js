let db = require("../models");
const bcrypt = require("bcrypt");
let lib = require("../library/functions");
let generator = require("generate-password");
let fs = require("fs");

module.exports = function (app) {

  // Create an user
  app.post("/api/users", function (req, res) {
    console.log(req.body);
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
      res.status(400).end("Password must be informed!");        
    }
    else if (pwd.length < 8) {
      res.status(400).end("Password must have at least 8 characters!");        
    }
    else {
      //crypt the password
      req.body.password = bcrypt.hashSync(pwd, 10);  
    }
    
    db.User.create(req.body).then(function(result) {
      res.json(result);
    }).catch(err => {
      if (err.errors) {
        res.status(400).end(err.errors[0].message);
      }
      else {
        res.status(500).end(err.message);
      }
    });
  });

  // Update an user
  app.put("/api/users", function (req, res) {
    let data = {};

    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update a user.");
    }
    else {
      
      //checks if the password field was passed
      try {
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
        //nothing to do, and the password won't be updated
      }

      //if there is file sent
      if (req.body.image !== "") {
                  
        //check if the exists in the temp folder
        if (fs.existsSync(`./public/images/uploads/tmp/${req.body.image}`)) {
          let fileExt = req.body.image.split(".");
          fileExt = fileExt[fileExt.length - 1];

          //create the new file name
          let fileName = `profile_${req.session.UserId}.${fileExt}`.toLowerCase();
        
          //rename the file and move it to definitive folder
          fs.renameSync(`./public/images/uploads/tmp/${req.body.image}`, `./public/images/uploads/${fileName}`);

          req.body.image = fileName;
          data.fileName = fileName;
        }
      }      

      db.User.update(req.body, { where: { id: req.session.UserId } }).then(function () {
        res.json(data);
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

  // Get all users
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (data) {
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
        res.status(400).end(err.errors[0].message);
      }
      else {
        res.status(500).end(err.message);
      }
    });
  });

  app.post("/api/users/resetpwd", function (req, res) {
    
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      
      if (user) {
        //creates a new pwd
        let newPassword = generator.generate({
          length: 10,
          numbers: true
        });
        
        //encrypt the password
        let cryptPwd = bcrypt.hashSync(newPassword, 10);

        //update the new password on user model
        db.User.update({
          password: cryptPwd
        },
        {
          where: {
            id: user.id
          }
        }).then(function () {
            
          let body = `Hello ${user.firstname},`+
          "<p>You've requested to reset your password on XiPTO website.</p>" +
          `<p>Your new password: <b>${newPassword}</b></p>` +
          "<p>We strongly recommend that you change it as soon as possible</p>" +
          "<p>Regards,</p>"+
          "<p>XiPTO Team</p>";
        
          lib.sendEmail(user.email, "Password Requested", body);
          res.status(200).end("Email has been sent!");          
        });
        
      }
      else {
        res.status(400).end("This e-mail is not registered!");
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

};
