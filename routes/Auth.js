const express = require("express");
const router = express.Router();

const { signup, login } = require("./../controllers/AuthCtr");
const {
  signupValidator,
  loginValidator,
} = require("./../utils/validators/authValidator");

// @desc Sign Up
router.post("/signup", signupValidator, signup);

// @desc Login
router.get("/login", loginValidator, login);

module.exports = router;
