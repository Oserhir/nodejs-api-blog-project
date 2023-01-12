const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

// @desc Make sure the user is logged in
exports.requireSignIn = asyncHandler(async (req, res, next) => {
  // 1) Get token from header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new Error("You are not login, Please login to get access this route")
    );
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          next(new Error(err.message));
        }
      } else {
        return decoded;
      }
    }
  );

  if (decoded) {
    // 3) Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new Error("The user that belong to this token does no longer exist")
      );
    }

    // 4) Save the user into req object
    req.user = user;

    next();
  }
});
