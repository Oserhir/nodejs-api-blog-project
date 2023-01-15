const handle = require("./handlersFactory");
const Post = require("../model/Post");
const User = require("../model/User");
const asyncHandler = require("express-async-handler");

exports.createPost = asyncHandler(async (req, res) => {
  // Create The Post
  req.body.author = req.user._id;
  const post = await Post.create(req.body);

  // Associate user to post
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { posts: post._id },
    },
    { new: true }
  );

  res.status(201).send({ data: post });
});
exports.updatePost = (req, res) => {};
exports.allPosts = (req, res) => {};
exports.getPost = (req, res) => {};
exports.deletePost = (req, res) => {};
