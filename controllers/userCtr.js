const User = require("../model/User");
const Post = require("../model/Post");
const Comment = require("../model/Comment");
const Category = require("../model/Category");

const handlers = require("./handlersFactory");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// Error
const apiError = require("../utils/apiError");

// Configuration for Multer
const storage = require("../config/cloudinary");
const multer = require("multer");
const { selectFields } = require("express-validator/src/select-fields");
const upload = multer({ storage: storage });

exports.uploadProfileImage = upload.single("profile");

// @desc Create a User
exports.createUser = handlers.createOne(User);

// @desc Update a User
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      firstname: req.body.firstname,
      lastname: req.body.firstname,
      email: req.body.email,
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});

// @desc Update Passwoed
exports.changeUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 10),
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});

// @desc Get All Users
exports.allUsers = handlers.getAll(User);

// @desc get a single user
exports.getUser = handlers.getOne(User, "user");

// @desc delete a user
exports.deleteUser = handlers.deleteOne(User, "user");

// @desc Permanantly Delete User Account
exports.deleteAccount = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  // Find the user to be deleted
  const user = await User.findById(userId);

  // find all posts to be deleted
  const posts = await Post.deleteMany({ author: userId });

  // Delete all comments of the user
  const comment = await Comment.deleteMany({ user: userId });

  // Delete all category of the user
  const category = await Category.deleteMany({ user: userId });

  user.delete();

  res.status(204).send();
});

// @desc Uploaded Image
exports.profilePhotoUpload = asyncHandler(async (req, res, next) => {
  // Find the user to be updated
  let user = await User.findById(req.user._id);

  // Check if the user exist
  if (!user) {
    return next(new apiError("User not found!", 404));
  }

  // Check is user is blocked
  if (user.isBlocked) {
    return next(new apiError("Access Blocked!", 403));
  }

  // Check is user is updating their photo
  if (req.file) {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { image: req.file.path } },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Successfully uploaded", data: user });
  }
});

// @desc Who View My Profile
exports.whoViewMyProfile = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user._id.toString()) {
    return next(new apiError("Action Denied!", 403));
  }

  if (!(await User.findById(req.params.id))) {
    return next(new apiError("User Not Found!", 403));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { viewers: req.params.id } },
    { new: true }
  ).populate({ path: "viewers" });

  res.status(200).json({ data: user.viewers });
});

// @desc following
exports.following = asyncHandler(async (req, res, next) => {
  // Find the user to follow
  const B = await User.findById(req.params.id);
  // Find the user who is following
  const A = await User.findById(req.user._id);

  if (req.user._id.toString() === req.params.id.toString()) {
    return next(new apiError("Access Denied!", 403));
  }

  // Check if user and userWhoFollowed are found
  if (A && B) {
    // Check if userWhofollowed is already in the user's followers array
    const isUserAlreadyFollowed = A.following.find(
      (follower) => follower.toString() === B._id.toString()
    );

    if (isUserAlreadyFollowed) {
      return next(new apiError("You already followed this user"));
    } else {
      //   add userToFollow to the userWhoFollowed's following array
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: { following: B._id },
        },
        { new: true }
      );
      // add userWhoFollowed into the user's followers array
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { followers: A._id },
        },
        { new: true }
      );
      res.json({
        status: "success",
        data: "You have successfully follow this user",
      });
    }
  } else {
    return next(new apiError("User that you trying to follow not found!", 403));
  }
});

// @desc Unfollowing
exports.Unfollowing = asyncHandler(async (req, res, next) => {
  const A = await User.findById(req.user._id);

  // Find the user to Unfollow
  const B = await User.findById(req.params.id);

  // Check if user and userWhoFollowed are found
  if (A && B) {
    // Check if A is already follow B
    const isUserAlreadyFollowed = A.following.find(
      (follower) => follower.toString() === B._id.toString()
    );

    if (!isUserAlreadyFollowed) {
      return next(new apiError("You have not followed this user"));
    } else {
      //   remove userToFollow to the userWhoFollowed's following array
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: B._id },
        },
        { new: true }
      );
      // remove userWhoFollowed into the user's followers array
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { followers: A._id },
        },
        { new: true }
      );
      res.json({
        status: "success",
        data: "You have successfully unfollow this user",
      });
    }
  } else {
    return next(
      new apiError("User that you trying to follow sas not found!", 403)
    );
  }
});

// @desc block user
exports.block = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const userToBeBlocked = await User.findById(req.params.id);

  // Check if userToBeBlocked and user are found
  if (user && userToBeBlocked) {
    // Check if userWhoUnfollowed is already in the user's blocked array
    const isUserAlreadyBlocked = user.blocked.find(
      (user) => user.toString() === userToBeBlocked._id.toString()
    );

    if (isUserAlreadyBlocked) {
      return next(new apiError("You already blocked this user", 403));
    }
    // Add userToBleBlocked to the user blocked arr
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { blocked: userToBeBlocked._id } },
      { new: true }
    );

    res.status(200).json({
      message: "You have successfully blocked this user",
    });
  } else {
    return next(
      new apiError("User that you trying to block was not found!", 403)
    );
  }
});

// @desc unblock user
exports.unblock = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const userToBeunBlock = await User.findById(req.params.id);
  // Check if userToBeunBlock and user are found
  if (user && userToBeunBlock) {
    const isUserAlreadyBlocked = user.blocked.find(
      (user) => user.toString() === userToBeunBlock._id.toString()
    );
    if (!isUserAlreadyBlocked) {
      return next(new apiError("You have not blocked this user", 403));
    }
    // Remove userToBeunBlock from the main user
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { blocked: userToBeunBlock._id } },
      { new: true }
    );
    res.status(200).json({
      message: "You have successfully unblocked this user",
    });
  } else {
    return next(
      new apiError("User that you trying to unblock was not found!", 403)
    );
  }
});

// @desc  admin block users
exports.block_admin = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: true },
    { new: true }
  );

  if (!user) {
    return next(new apiError(`No user for this id ${req.params.id}`, 404));
  }

  res
    .status(200)
    .json({ message: "You Successfully block this user", data: user });
});

// @desc  admin unblock users
exports.unblockUser_admin = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: false },
    { new: true }
  );

  if (!user) {
    return next(new apiError(`No user for this id ${req.params.id}`, 404));
  }

  res
    .status(200)
    .json({ message: "You Successfully unblock this user", data: user });
});
