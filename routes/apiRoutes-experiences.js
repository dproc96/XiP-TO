
const db = require("../models");
const fs = require("fs");

module.exports = function (app) {

  // Get all experiences that are active
  app.get("/api/experiences", function (req, res) {
    db.Experience.findAll({
      include: [{all:true}],
      order: [["CategoryId", "ASC"]],
      where: {
        active: true
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
      if (err.errors) {
        res.status(400).end(err.errors[0].message);
      }
      else {
        console.log(err);
        res.status(500).end(err.message);
      }
    });
  });

  // Get all experiences that are active from an user
  app.get("/api/experiences/user/:userid", function (req, res) {

    //check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to see your experiences.");
    }
    else {
      
      db.Experience.findOne({
        include: [db.Review, db.User],
        order: [["CategoryId", "ASC"]],
        where: {
          UserId: req.session.UserId,
          active: true
        }
      }).then(function (data) {
        res.json(data);
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

  // Create an experience
  app.post("/api/experiences", function (req, res) {

    // check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to create an experience");
    }
    else {
      //set the user id from the session
      req.body.UserId = req.session.UserId;
    



    
      //store the new experience on the database
      db.Experience.create(req.body).then(function (exp) {
      
        //if there is file sent
        if (req.body.image !== "") {
        
          //check if the exists in the temp folder
          if (fs.existsSync(`./public/images/uploads/tmp/${req.body.image}`)) {


            //rename the file and move it to definitive folder
            fs.renameSync(`./public/images/uploads/tmp/${req.body.image}`, `./public/images/uploads/${exp.image}`);
          }

        }
        res.json(exp);

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

  
  // Update an experience
  app.put("/api/experiences", function (req, res) {

    // check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update an experience");
    }
    else {
    
      //if there is file sent
      if (req.body.image !== "") {
            
        //check if the exists in the temp folder
        if (fs.existsSync(`./public/images/uploads/tmp/${req.body.image}`)) {
          let fileExt = req.body.image.split(".");
          fileExt = fileExt[fileExt.length - 1];


          //create the new file name
          let fileName = `experience_${req.params.id}.${fileExt}`;
        
          //rename the file and move it to definitive folder
          fs.renameSync(`./public/images/uploads/tmp/${req.body.image}`, `./public/images/uploads/${fileName}`);

          req.body.image = fileName;
        }

      }

      db.Experience.update(req.body, { where: { id: req.body.id } }).then(function (result) {
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

  // Delete an experience by id (actually just change the active field to false)
  app.delete("/api/experiences/:id", function (req, res) {
    
    // check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to delete experience");
    }
    else {
    
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
        if (err.errors) {
          res.status(400).end(err.errors[0].message);
        }
        else {
          res.status(500).end(err.message);
        }
      });
    }
  });

  //upload a file to the server
  app.post("/api/uploadfile", function (req, res) {
    // check if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to upload files");
    }
    else {
      if (req.files) {
              
        var fileName = req.files.file.name;
        
        //get the file extension
        var fileExt = fileName.split(".");
        fileExt = fileExt[fileExt.length - 1];
  
        //add extension to filename
        var fullFileName = `${req.files.file.tempFilePath}.${fileExt}`;
  
        var fileName = fullFileName.split("/");
        fileName = fileName[fileName.length - 1];
        
        //rename the file to add the extension
        req.files.file.mv(fullFileName, function(err) {
          if (!err) {
            fullFileName = fullFileName.replace("public/", "");
            
            data = {
              fileName: fileName,
              fullFileName: fullFileName
            };
            
            res.json(data);
          }
          else {
            res.status(400).end(err.message);
          }
        });      
        
      }
      else {
        res.status(500).end("File was not sent");
      }  
    }

  });

};
