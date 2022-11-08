const db = require("../models/db");

module.exports.requireAuth = (req, res, next) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

module.exports.requireAdmin = (req, res, next) => {
  if (req.signedCookies.role == "user") {
    res.redirect("/");
  } else {
    next();
  }
};
