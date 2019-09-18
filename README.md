# Xipto

Xipto is a social app which people use to share their experiences that they had in different places like restaurant, theatre, parks, and so on.

## Overview

 *  A user is able to share and review as many as experiences he wants by creating an account first and then sign in. The user’s score raises 5 points by sharing a new experience and 1 point by reviewing an experience. 


 *  The app is a full-stack web application created with MySQL, Node, Express.js, Handlebars, and Sequelize.js . 
 
       * Used Express to manage the server and routes.
       * Used Node and MySQL to query and routed data in the app.
       * Used Handlebars to generate the HTML.
       * Used Sequelize.js to talk to the database which provides easy access to MYSQL.
       * Used eslint for linting which analyse the code for potential errors.
       * Used Travis-CI for Continuous Integration (CI) which automate the build and testing of code
          every time a team member commits changes to version control.
       * Used express-fileupload middleware to upload images.
       * Used generate-password for generating random and unique passwords.
       * Used express-session to handle sessions in Node.js.
       * Used SendGrid API to send e-mails.
       * Used bcrypt to hash passwords.
    
## Instructions
### App Setup
1.	Make a package.json file by running npm init from the command line.
2.	Create a server.js file.
3.	Install the Express npm package: npm install express express-handlebars express-fileupload express-session
4.	Install the Handlebars npm package: npm install express-handlebars.
5.	Install MySQL npm package: npm install mysql.
6.	Require the following npm packages inside of the server.js file:
      *  Express
      *  Express-handlebars
      *  Express-fileupload – used to upload images.
      *  Express-session - used to handle sessions in Node.js.
      *  Fs - used to work with file system.
      *  @sendgrid/mail - used to send e-mails (required an API key on the sendgrid.com website)
      *  bcrypt - used to hash passwords
      
### DB Setup
1.	Inside the models directory, create schema.sql and seeds.sql.
2.	Write SQL queries in schema.sql. 
3.	Write insert queries to populate the user, experience and review table with some entries.

### Config Setup
1.	Create a folder named config.
2.	Install sequelize package : npm install -g sequelize sequelize-cli
3.	Create a config.json file inside config directory using  sequelize init config command line – change config.json to config.js- install dotenv module –require and config dotenv in config.js –create .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE
4.	Create a metadata.js 

### Model setup
1.	create a folder named models.
2.	In models, make  the following files: 
      *  Index.js: Create an index.js file using Sequelize-CLI – sequelize init model
      *  Category.js : define the category table using sequelize with two fields: name and active.
      *  Experience.js: define the category table using sequelize with the following fields: name, location, location2,
         location 3, description, image, active- add afterCreate hook to update the user score and rename the name of
         the uploaded  image by a user.
      *  Review.js: define the category table using sequelize with the follwoing fields: liked, comment, active- 
         add afterCreate hook to  update the user score when he/she review an experience.
      *  User.js: define the category table using sequelize with the following fields: firstname, lastname, email, password, score, 
         and active.
 
**Note:** associate tables using foreign key: a user hasMany experiences and reviews. A review blongsTo an experience and a user. 
An experience hasMany reviews and belongsTo a user and a category. A category hasMany experiences.

### Routes setup
1. Create a folder named  routes.  
2. In routes, make  the following files: 
      *  htmlRoutes.js: create a set of routes to render handlebars pages.
      *  apiRoutes-user.js: create an user on the user table using a post route with /api/users.
      *  apiRoutes-category.js : create a get route with /api/categories url to get all the categories that are active.
      *  apiRoutes-experience.js: create a set of routes to create, update, and delete operations on the experience table.
      *  apiRoutes-review.js: create a set of routes to create, update, and delete operations on the review table.
      *  apiRoutes-auth.js: Authenticate an user using a post route /api/auth- sign out the user using a post route 
         /api/signout-require bcrypt which is a library on NPM for hashing and comparing passwords in Node. 
         Use bcrypt for compareing the password sent with the hash stored in the database.

### View setup
1.	Create the layouts directory inside views directory.
      *  Create the main.handlebars file inside layouts directory..
      *  Setup the main.handlebars file so it's able to be used by Handlebars.
2. Setup the index.handlebars , new-experience.handlebars , profile.handlebars, user.handlebars  to have the templates that Handlebars can render onto.


![image](https://user-images.githubusercontent.com/49765334/65067481-9f069600-d954-11e9-87bb-2674bd4e6722.png)
![image](https://user-images.githubusercontent.com/49765334/65067510-b0e83900-d954-11e9-8b85-b2e18a261698.png)
![image](https://user-images.githubusercontent.com/49765334/65067552-c78e9000-d954-11e9-9ce5-c7e348881e92.png)
![image](https://user-images.githubusercontent.com/49765334/65067582-d6754280-d954-11e9-871b-8f5beaf853ca.png)

### Contributors
   ##### Carolina Cavalcanti 
   ##### Dan Proctor
   ##### Farzad Moghbel
   ##### Rizwan Renesa
   ##### Soheila Lotfi
