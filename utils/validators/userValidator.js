const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const User = require("../../model/User");

exports.createUserValidator = [
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
      // Check if The Email Exist
      const user = await User.findOne({ email: email });

      if (user) {
        throw new Error("User Already Exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is not allowed to be empty")
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  body("role")
    .optional()
    .custom((role, { req }) => {
      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        throw new Error(
          `User validation failed: role: ${role} is not a valid enum value for path`
        );
      }

      return true;
    }),

  validatorResult,
];

exports.updateUserValidator = [
  // body("id").isMongoId().withMessage("Invalid user id format"),
  body("firstname")
    .optional()
    .isLength({ max: 10 })
    .withMessage(
      "firstname length must be less than or equal to 10 characters long"
    )
    .isLength({ min: 4 })
    .withMessage("firstname length must be at least 3 characters long"),
  body("lastname")
    .optional()
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
    .withMessage("Invalid email address")
    .custom(async (email, { req }) => {
      // Check if The Email Exist
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .optional()
    .isLength({ min: 5 })
    .withMessage("password length must be at least 5 characters long"),
  body("role")
    .optional()
    .custom((role, { req }) => {
      const roles = ["user", "admin"];

      if (!roles.includes(role)) {
        throw new Error(
          `User validation failed: role: ${role} is not a valid enum value for path`
        );
      }

      return true;
    }),

  validatorResult,
];

exports.deleteUserValidator = [
  // body("id").isMongoId().withMessage("Invalid user id format"),

  validatorResult,
];
