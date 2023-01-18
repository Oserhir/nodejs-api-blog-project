const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  allPosts,
  getPost,
  deletePost,
} = require("../controllers/postCtr");

const {
  requireSignIn,
  alowedTo,
  isBlocked,
} = require("../middlwares/authMiddlwares");

const {
  createPostValidator,
  removePostValidator,
  updatePostValidator,
  getPostValidator,
} = require("../utils/validators/postValidator");

// @Desc Create Post
// @Access Private
router.post(
  "/",
  requireSignIn,
  alowedTo("admin", "user"),
  isBlocked,
  createPostValidator,
  createPost
);

// @desc Update Post
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  updatePostValidator,
  updatePost
);

// @desc get all Post
router.get("/", allPosts);

// @desc get a single Post
router.get("/:id", getPostValidator, getPost);

// @desc Delete a Post
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  removePostValidator,
  deletePost
);

module.exports = router;
