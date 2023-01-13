const { body, validationResult } = require("express-validator");
const User = require("../../model/User");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const bcrypt = require("bcrypt");
const apiError = require("./../apiError");

exports.signupValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("firstname is not allowed to be empty")
    .isLength({ max: 10 })
    .withMessage(
      "firstname length must be less than or equal to 10 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("firstname length must be at least 3 characters long"),
  body("lastname")
    .notEmpty()
    .withMessage("lastname is not allowed to be empty")
    .isLength({ max: 10 })
    .withMessage(
      "lastname length must be less than or equal to 10 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("lastname length must be at least 3 characters long"),
  body("email")
    .notEmpty()
    .withMessage("email is not allowed to be empty")
    .isLength({ max: 40 })
    .withMessage(
      "email length must be less than or equal to 40 characters long"
    )
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (email, { req }) => {
      // Check if Email Exist
      const user = await User.findOne({ email: email });

      if (user) {
        return Promise.reject(new Error("E-mail already in use"));
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  validatorResult,
];

exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is not allowed to be empty")
    .isEmail()
    .withMessage("Email must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty"),
  validatorResult,
];
