require("dotenv").config();
let express = require("express");
let exphbs = require("express-handlebars");
let fs = require("fs");
let fileUpload = require("express-fileupload");
let session = require("express-session");

let db = require("./models");

let app = express();
let PORT = process.env.PORT || 3000;

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
  secret: "XiPTOkey",
  resave: true,
  saveUninitialized: true
}));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      ifEquals: function(arg1, arg2, options) {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
      }
    }
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

let syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  
  if (syncOptions.force) {
    
    //execute the schema changes and the seeds
    let schema = fs.readFileSync("./models/schema.sql", { encoding: "utf8" });
    let seeds = fs.readFileSync("./models/seeds.sql", { encoding: "utf8" });
  
    db.sequelize.query(schema + seeds, { raw: true }).then(() => {
      app.listen(PORT, function () {
        console.log(
          "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
          PORT,
          PORT
        );
      });
    });
  }
  else {
    app.listen(PORT, function () {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  }
  
});

module.exports = app;
