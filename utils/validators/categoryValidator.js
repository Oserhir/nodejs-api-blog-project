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

exports.getCategoryValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Category id format`);
    }
    return true;
  }),

  validatorResult,
];

exports.updateCategoryValidator = [
  body("title")
    .notEmpty()
    .withMessage("title is not allowed to be empty")
    .custom((title, { req }) => {
      if (!isValidObjectId(req.params.id)) {
        throw new Error(`Invalid Category id format`);
      }

      req.body.slug = slugify(title.toLowerCase());
      req.body.user = req.user._id;
      return true;
    }),

  validatorResult,
];

exports.deleteCategoryValidator = [
  body("id").custom((value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Category id format`);
    }
    return true;
  }),

  validatorResult,
];
