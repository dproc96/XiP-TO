db = require("../models");

//load categories from the database
function loadCategories() {
  return db.Category.findAll({
    attributes: ["name", ["id", "value"]],
    where: {
      active: true
    },
    order: [["name", "ASC"]]
  });
}

module.exports = {
  homepageButtonText: "Back To Home Page",
  iconImageSrc: "/images/xipto.png",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  categories: "",
  loadCategories: loadCategories,
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
  ],
  buttons: [
    {
      name: "Sign In/Sign Up",
      link: "#",
      id: "sign-in"
    },
    {
      name: "Post Your Experience",
      link: "/experiences/new",
      id: "post"
    },
    {
      name: "How to Post",
      link: "#",
      id: "how-to"
    },
    {
      name: "About Us",
      link: "#",
      id: "about"
    },
  ]
};

