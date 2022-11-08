const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();

// setup users route
router.get("/", userController.getAll);
// get user by id
router.get("/:id", userController.getById);
// create user
router.post("/", userController.createUser);
// update user by id
router.put("/:id", userController.updateUserById);
// delete user by id
router.delete("/:id", userController.deleteUserById);

// export router
module.exports = router;
