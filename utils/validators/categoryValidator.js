const { body } = require("express-validator");
const User = require("../../model/User");
const slugify = require("slugify");
const isValidObjectId = require("../../utils/validMongodbObjectid");
const validatorResult = require("../../middlwares/validatorMiddlwares");

exports.createCategoryValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is not allowed to be empty")
    .custom((title, { req }) => {
      req.body.slug = slugify(title.toLowerCase());
      req.body.user = req.user._id;
      return true;
    }),

  validatorResult,
];
