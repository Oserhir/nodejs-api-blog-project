const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/generateToken");
const apiError = require("../utils/apiError");

// @desc Sign Up
exports.signup = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Create the user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });

  if (user) {
    res.status(201).json({ token: createToken(user._id), data: user });
  }
});

// @desc Login
exports.login = asyncHandler(async (req, res, next) => {
  //  check if password and email in the body (validation)
  //  check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new apiError("Invalid Password or Email", 401));
  }
  if (user.isBlocked) {
    return next(new apiError("Your Account has been disabled", 403));
  }
  //  Create Token
  const token = createToken(user._id);

  //  Delete password from response
  delete user._doc.password;

  //  Send response to client side
  res.status(200).json({ token, data: user });
});
