// require necessary modules
const express = require("express");
const server = express();
const bodyParser = require("body-parser"); // read data from req.body
const ejs = require("ejs"); // template engines
const cors = require("cors"); // fix cors err
const cookieParser = require("cookie-parser"); // read cookie from req.cookies
const multer = require("multer"); // upload file
const morgan = require("morgan"); // log request type to debug
const port = 5000;
//import routes
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const movieRoutes = require("./routes/movie.routes");
const homepageRoutes = require("./routes/homepage.routes");
const {
  requireAuth,
  notRequireAuth,
} = require("./middlewares/auth.middlewares");
// set up storage for uploading file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });
// set up template engines
server.set("view engine", "ejs");
server.set("views", `${__dirname}/views`);

// set up global middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser("secret"));
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

// setup router
// Tuỳ thuộc vào yêu cầu bài viết

// server.get("/", requireAuth, (req, res) => {
//   res.render("homepage");
// });
server.use("/", homepageRoutes);
// user/quanly user
server.use("/user", userRoutes);
// move
server.use("/movie", movieRoutes);

// auth/ quanly dang nhap dang ki
server.use("/auth", authRoutes);

// run server on port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
