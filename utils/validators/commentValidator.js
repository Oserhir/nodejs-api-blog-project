const { body, validationResult } = require("express-validator");
const validatorResult = require("../../middlwares/validatorMiddlwares");
const isValidObjectId = require("../validMongodbObjectid");
const Post = require("../../model/Post");
const Comment = require("../../model/Comment");

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

exports.updateCommentValidator = [
  body("description").notEmpty().withMessage("description is required"),
  body("id").custom(async (value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Comment id format`);
    }
    // find the comment
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return new Error(`No comment for thi id ${req.params.id}`);
    }

    // Check if the user owner this comment
    if (req.user._id.toString() !== comment.user.toString()) {
      throw new Error(`you are not allowed to update this comment`, 403);
    }
  }),

  validatorResult,
];

exports.getCommentValidator = [
  body("id").custom(async (value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Comment id format`);
    }
  }),

  validatorResult,
];

exports.deleteCommentValidator = [
  body("id").custom(async (value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Comment id format`);
    }

    // find the comment
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return new Error(`No comment for thi id ${req.params.id}`);
    }
    // Check if the user owner this comment
    if (req.user._id.toString() !== comment.user.toString()) {
      throw new Error(`you are not allowed to delete this comment`, 403);
    }
  }),
  validatorResult,
];

exports.getCommentValidator = [
  body("id").custom(async (value, { req }) => {
    if (!isValidObjectId(req.params.id)) {
      throw new Error(`Invalid Comment id format`);
    }
  }),

  validatorResult,
];
