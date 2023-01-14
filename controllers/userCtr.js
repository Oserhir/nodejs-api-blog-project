const User = require("../model/User");
const handlers = require("./handlersFactory");
const asyncHandler = require("express-async-handler");

// Configuration for Multer
const storage = require("../config/cloudinary");
const multer = require("multer");
const apiError = require("../utils/apiError");
const e = require("express");
const upload = multer({ storage: storage });

exports.uploadProfileImage = upload.single("profile");

// @Desc Create a User
exports.createUser = handlers.createOne(User);

// @Desc Update User
exports.updateUser = handlers.updateOne(User, "user");

// @Desc Get All User
exports.allUsers = handlers.getAll(User);

// @Desc Get Single User
exports.getUser = handlers.getOne(User, "user");

// @Desc Delete a User
exports.deleteUser = handlers.deleteOne(User, "user");

// @Desc Uploaded image
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

  // Check is user is updating thier photo
  if (req.file) {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { image: req.file.path } },
      {
        new: true,
      }
    );

    // update profile photo
    res.status(200).json({ message: "Successfully uploaded", data: user });
  }
});

// Who View My Profile
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
  );

  res.status(200).json({ data: user });
});

// @Desc following
exports.following = asyncHandler(async (req, res, next) => {
  // Find the user to follow
  const B = await User.findById(req.params.id);
  // Find the user who is following
  const A = await User.findById(req.user._id);

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

// @Desc Unfollowing
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
    return next(new apiError("User that you trying to follow not found!", 403));
  }
});
