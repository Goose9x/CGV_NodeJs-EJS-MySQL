const express = require("express");
const movieController = require("../controllers/movie.controller");
const router = express.Router();
const {
  requireAuth,
  notRequireAuth,
  requireAdmin
} = require("../middlewares/auth.middlewares");
router.get("/now-showing", movieController.printAllMovie);
router.get("/:id", requireAuth, movieController.printIdMovie);
router.get("/city/cinema/:id", movieController.getCinema);
router.get("/booking/:id", movieController.getSeat);
router.post("/booking/:id", movieController.updateBooking);
router.get("/ticket/:id", movieController.getTicket);
module.exports = router;
