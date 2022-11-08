const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
module.exports.renderAdminMovies = (req, res) => {
  console.log(req.signedCookies);
  db.execute("SELECT * FROM table_movies").then((data) => {
    let [rows] = data;
    if (Object.keys(req.signedCookies).length === 0) {
      res.render("adminMovies", {
        userName: "",
        data: rows,
      });
    } else {
      res.render("adminMovies", {
        userName: req.signedCookies.userName,
        data: rows,
      });
    }
  });
};
module.exports.renderAdminUsers = (req, res) => {
  console.log(req.signedCookies);
  db.execute("SELECT * FROM table_users").then((data) => {
    let [rows] = data;
    if (Object.keys(req.signedCookies).length === 0) {
      res.render("adminUser", {
        userName: "",
        data: rows,
      });
    } else {
      res.render("adminUser", {
        userName: req.signedCookies.userName,
        data: rows,
      });
    }
  });
};
module.exports.renderLogin = (req, res) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.render("login", {
      userName: "",
    });
  } else {
    res.render("login", {
      userName: req.signedCookies.userName,
    });
  }
};

module.exports.renderRegister = (req, res) => {
  if (Object.keys(req.signedCookies).length === 0) {
    res.render("register", {
      userName: "",
    });
  } else {
    res.render("register", {
      userName: req.signedCookies.userName,
    });
  }
};
module.exports.login = (req, res) => {
  let { email, phone, password } = req.body;
  if (email && password) {
    db.execute("SELECT * FROM table_users WHERE email = ? ", [email]).then(
      (data) => {
        let [rows] = data;
        if (rows.length == 0) {
          res.status(400).json({ message: "Email or phone not found" });
        } else {
          let passValid = bcrypt.compareSync(password, rows[0].password);
          if (!passValid) {
            res.status(400).json({ message: "Wrong password" });
          } else {
            res.cookie("userId", rows[0].userId, { signed: true });
            res.cookie("userName", rows[0].userName, { signed: true });
            res.cookie("role", rows[0].role, { signed: true });
            res.status(200).json({
              message: `Chào mừng bạn đã đến với bình minh vô tận`,
              status: "success",
              role: req.signedCookies.role,
            });
            // res.redirect("/"); ko hoạt động after res.cookie
            // --> để frontent làm
          }
        }
      }
    );
  } else if (phone && password) {
    db.execute("SELECT * FROM table_users WHERE phone = ? ", [phone]).then(
      (data) => {
        let [rows] = data;
        if (rows.length == 0) {
          res.status(400).json({ message: "Email or phone not found" });
        } else {
          let passValid = bcrypt.compareSync(password, rows[0].password);
          if (!passValid) {
            res.status(400).json({ message: "Wrong password" });
          } else {
            res.cookie("userId", rows[0].userId, { signed: true });
            res.cookie("userName", rows[0].userName, { signed: true });
            res.cookie("role", rows[0].role, { signed: true });
            res.status(200).json({
              message: `Chào mừng bạn đã đến với bình minh vô tận`,
              status: "success",
            });
            // res.redirect("/"); ko hoạt động after res.cookie
            // --> để frontent làm
          }
        }
      }
    );
  } else if (!email) {
    res.status(400).json({ message: "Please input email" });
  } else if (!phone) {
    res.status(400).json({ message: "Please input phone" });
  } else if (!password) {
    res.status(400).json({ message: "Please input password" });
  }
};

module.exports.register = (req, res) => {
  let { userName, phone, email, password } = req.body;
  if (!userName || !phone || !email || !password) {
    return res.status(500).json({ message: "Invalid input" });
  }
  if (!strongRegex.test(password)) {
    return res.status(500).json({ message: "Password is not strong enough" });
  }
  password = bcrypt.hashSync(password, saltRounds);
  let userId = Math.floor(Math.random() * 1000);
  db.execute("SELECT * FROM table_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      if (rows.length > 0) {
        // res.status(400).json({ message: "User already exist" });
        return res.status(500).json({ message: "User already existed" });
      } else {
        db.execute("SELECT * FROM table_users WHERE phone = ?", [phone]).then(
          (data) => {
            let [rows] = data;
            let role = "user";
            if (rows.length > 0) {
              // res.status(400).json({ message: "User already exist" });
              return res
                .status(500)
                .json({ message: "This phone is already existed" });
            } else {
              return db.execute(
                "INSERT INTO table_users VALUES(?, ?, ?, ?, ?, ?)",
                [userId, userName, phone, email, password, role]
              );
            }
          }
        );
      }
    })
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "Create one successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports.forgotPassword = (req, res) => {
  res.send("forgot password");
};
