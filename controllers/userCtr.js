const User = require("../model/User");
const handlers = require("./handlersFactory");
const asyncHandler = require("express-async-handler");

// Configuration for Multer
const storage = require("../config/cloudinary");
const multer = require("multer");
const apiError = require("../utils/apiError");
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
