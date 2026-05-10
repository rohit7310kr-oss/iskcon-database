const express = require("express");
const {
  createUser,
  login,
  logoutUser,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(createUser);

router.route("/login").post(login);

router.route("/logout").post(authMiddleware, logoutUser);

// router.route("/verify-token");

module.exports = router;
