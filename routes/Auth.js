const express = require("express");
const router = express.Router();

const { signup, login } = require("./../controllers/AuthCtr");
const {
  signupValidator,
  loginValidator,
} = require("./../utils/validators/authValidator");

// @Desc Sign Up
router.post("/signup", signupValidator, signup);

// @Desc Login
router.get("/login", loginValidator, login);

module.exports = router;
