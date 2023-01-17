const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const isValidObjectId = require("../validMongodbObjectid");
const Post = require("../../model/Post");

exports.createCommentValidator = [
  body("description").notEmpty().withMessage("description is required"),
  body("post")
    .notEmpty()
    .withMessage("post is required")
    .custom(async (value, { req }) => {
      req.body.user = req.user._id;

      if (!isValidObjectId(req.body.post)) {
        throw new Error(`Invalid Post id format`);
      }

      // Check if The Post Found
      const post = await Post.findById(value);
      if (!post) {
        throw new Error(`No post for this ${value}`);
      }
      req.post = post;

      return true;
    }),

  validatorResult,
];
