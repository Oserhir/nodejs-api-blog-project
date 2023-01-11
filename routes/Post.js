const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  allPosts,
  getPost,
  deletePost,
} = require("../controllers/postCtr");

// @desc Create Post
router.post("/", createPost);

// @desc Update Post
router.put("/:id", updatePost);

// @desc get all Post
router.get("/", allPosts);

// @desc get a single Post
router.get("/:id", getPost);

// @desc Delete a Post
router.delete("/:id", deletePost);

module.exports = router;
