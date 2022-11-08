const db = require("../models/db");

module.exports.renderHomepage = (req, res) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.render("homepage", {
      userName: "",
    });
  } else {
    res.render("homepage", {
      userName: req.signedCookies.userName,
    });
  }
};
