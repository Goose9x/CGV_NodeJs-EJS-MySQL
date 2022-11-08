const db = require("../models/db");
const _ = require("lodash");
module.exports.printAllMovie = (req, res) => {
  db.execute("SELECT * FROM table_movies").then((data) => {
    let [rows] = data;
    console.log(rows);
    let renderData = _.chunk(rows, 4);
    if (Object.keys(req.signedCookies).length === 0) {
      res.render("movies", {
        userName: "",
        data: renderData,
      });
    } else {
      res.render("movies", {
        userName: req.signedCookies.userName,
        data: renderData,
      });
    }
  });
};
module.exports.printIdMovie = (req, res) => {
  let id = req.params.id;
  let today = new Date();
  // today = mm + "/" + dd + "/" + yyyy;
  let thirtyDate = new Date(new Date().setDate(today.getDate() + 30));

  thirtyDate = today.toISOString().substring(0, 10);
  db.execute("SELECT * FROM table_movies WHERE movieId = ?", [id])
    .then((data) => {
      let [rows] = data;
      let date = new Date(rows[0].releaseDate);
      let releaseDate = date.toISOString().substring(0, 10);
      let movieData = {
        movieId: rows[0].movieId,
        todayCalendar: today,
        title: rows[0].title,
        description: rows[0].description,
        duration: rows[0].duration,
        language: rows[0].language,
        releaseDate: releaseDate,
        genre: rows[0].genre,
        image: rows[0].image,
        director: rows[0].director,
        casts: rows[0].casts,
      };

      let movieArray = [];
      for (let i = 0; i < 30; i++) {
        movieArray.push(i);
      }
      db.execute("SELECT * FROM city").then((data) => {
        let city = data[0];
        db.execute("SELECT * FROM cinema").then((data) => {
          let cinema = data[0];
          console.log(cinema);
          if (Object.keys(req.signedCookies).length === 0) {
            res.render("movieId", {
              userName: "",
              movieData,
              movieArray,
              city,
              cinema,
            });
          } else {
            res.render("movieId", {
              userName: req.signedCookies.userName,
              movieData,
              movieArray,
              city,
              cinema,
            });
          }
        });
      });
    })

    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
module.exports.getCinema = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM cinema WHERE cityId = ? ", [id])
    .then((data) => {
      res.status(200).json({ message: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

module.exports.getSeat = (req, res) => {
  let { state, cinema, time } = req.query;
  let { id } = req.params;
  let timeBooking = "";
  db.execute("SELECT * FROM table_movies WHERE movieId = ?", [id]).then(
    (data) => {
      cinema = cinema;
      console.log(data[0][0]);
      let title = data[0][0].title;
      let image = data[0][0].image;
      if (state == "1") {
        cinema = cinema;
      }
      if (state == "2") {
        cinema = Number(cinema) + 3;
      }
      if ((state = "3")) {
        cinema = Number(cinema) + 6;
      }
      console.log(state, cinema, time);

      db.execute(
        "SELECT cinemaName FROM cinema WHERE cityId = ? AND cinemaId = ? ",
        [state, cinema]
      ).then((data) => {
        let cinemaName = data[0][0].cinemaName;

        if (time == "1") {
          timeBooking = "08:00-10:00";
        }
        if (time == "2") {
          timeBooking = "10:00-12:00";
        }
        if (time == "3") {
          timeBooking = "12:00-14:00";
        }
        if (time == "4") {
          timeBooking = "14:00-16:00";
        }
        if (time == "5") {
          timeBooking = "16:00-18:00";
        }
        if (time == "6") {
          timeBooking = "18:00-1020:00";
        }
        console.log(timeBooking);
        console.log(cinemaName);
        if (Object.keys(req.signedCookies).length === 0) {
          res.render("seat", {
            userName: "",
            cinemaName,
            title,
            image,
            timeBooking,
          });
        } else {
          res.render("seat", {
            userName: req.signedCookies.userName,
            cinemaName,
            title,
            image,
            timeBooking,
          });
        }
      });
    }
  );
};
module.exports.getTicket = (req, res) => {
  let { state, cinema, time } = req.query;
  let { id } = req.params;
  let { totalPrice } = req.body;
  let timeBooking = "";
  console.log("a");
  console.log(req.body);
  console.log("a");

  db.execute("SELECT * FROM table_movies WHERE movieId = ?", [id]).then(
    (data) => {
      console.log(data[0][0]);
      let title = data[0][0].title;
      let image = data[0][0].image;
      if (state == "1") {
        cinema = cinema;
      }
      if (state == "2") {
        cinema = Number(cinema) + 3;
      }
      if ((state = "3")) {
        cinema = Number(cinema) + 6;
      }

      db.execute(
        "SELECT cinemaName FROM cinema WHERE cityId = ? AND cinemaId = ? ",
        [state, cinema]
      ).then((data) => {
        let cinemaName = data[0][0].cinemaName;

        if (time == "1") {
          timeBooking = "08:00-10:00";
        }
        if (time == "2") {
          timeBooking = "10:00-12:00";
        }
        if (time == "3") {
          timeBooking = "12:00-14:00";
        }
        if (time == "4") {
          timeBooking = "14:00-16:00";
        }
        if (time == "5") {
          timeBooking = "16:00-18:00";
        }
        if (time == "6") {
          timeBooking = "18:00-20:00";
        }

        if (Object.keys(req.signedCookies).length === 0) {
          res.render("ticket", {
            userName: "",
            cinemaName,
            title,
            image,
            timeBooking,
          });
        } else {
          res.render("ticket", {
            userName: req.signedCookies.userName,
            cinemaName,
            title,
            image,
            timeBooking,
          });
        }
      });
    }
  );
};
module.exports.updateBooking = (req, res) => {
  let { id } = req.params;
  let bookingId = Math.floor(Math.random() * 1000);
  let userId = req.signedCookies.userId;
  let cinemaId,
    showId = 1;
  let status = true;
  let { seatNumber } = req.body;
  db.execute("INSERT INTO booking VALUE(?,?,?,?,?,?) ", [
    bookingId,
    seatNumber,
    status,
    userId,
    showId,
    cinemaId,
  ])
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
