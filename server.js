require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var fs = require("fs");
var fileUpload = require("express-fileupload");
var session = require('express-session');

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : "./public/images/uploads/tmp/"
}));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes-categories")(app);
require("./routes/apiRoutes-experiences")(app);
require("./routes/apiRoutes-reviews")(app);
require("./routes/apiRoutes-users")(app);
require("./routes/apiRoutes-auth")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  
  //execute the schema changes and the seeds
  let schema = fs.readFileSync("./models/schema.sql", { encoding: "utf8" });
  let seeds = fs.readFileSync("./models/seeds.sql", { encoding: "utf8" });
  
  db.sequelize.query(schema + seeds, { raw: true }).then(() => {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });  
  });

  
});

module.exports = app;
