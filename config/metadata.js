db = require("../models");

//load categories from the database
function loadCategories() {
  return db.Category.findAll({
    attributes: ["name", "id"],
    where: {
      active: true
    },
    order: [["name", "ASC"]]
  });
}

//load categories from the database
function loadUsers() {
  return db.User.findAll({
    attributes: ["firstname", "lastname", "id", "image"],
    where: {
      active: true
    }
  });
}

module.exports = {
  homepageButtonText: "Back To Home Page",
  iconImageSrc: "/images/xipto.png",
  description: "XiPTO is an experience focused site for residents and visitors in Toronto. To add your own experience, give it a name, add a picture, choose the category, give us 1-3 locations involved, and tell us the story of your experience!",
  categories: "",
  loadCategories: loadCategories,
  loadUsers: loadUsers,
  userLoggedIn: false,
  quotes: [
    {
      text: "XiP-TO has taken care of the adventures I was looking for!",
      author: "Aditi"
    },
    {
      text: "I use XiP-TO for planning with my friends",
      author: "Richie"
    },
    {
      text: "For what it's worth,I have been using XiP-TO for a while and I have much more fun these days!",
      author: "John"
    }
  ]
};

