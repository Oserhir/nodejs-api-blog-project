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
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new apiError("Invalid Password or Email", 401));
  }
  // 4) Create Token
  const token = createToken(user._id);

  // 5) Delete password from response
  delete user._doc.password;

  // 6) Send response to client side
  res.status(200).json({ token, data: user });
});
