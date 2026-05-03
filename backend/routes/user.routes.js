const express = require("express");
const { createUser, login } = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(createUser);

router.route("/login").post(login);

router.route("/verify-token");

module.exports = router;
