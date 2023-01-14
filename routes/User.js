const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  allUsers,
  getUser,
  deleteUser,
  profilePhotoUpload,
  uploadProfileImage,
  whoViewMyProfile,
  following,
  Unfollowing,
} = require("./../controllers/userCtr");

const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  getUserValidator,
  getAllUserValidator,
  whoViewMyProfileValidator,
  followValidator,
} = require("../utils/validators/userValidator");
const { requireSignIn, alowedTo } = require("../middlwares/authMiddlwares");

// @Desc Create a User
// @access Private/Admin
router.post(
  "/",
  requireSignIn,
  alowedTo("admin"),
  createUserValidator,
  createUser
);

// @desc Update a User
// @access Private/Admin
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin"),
  updateUserValidator,
  updateUser
);

// @desc Delete a User
// @access Private/Admin
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin"),
  deleteUserValidator,
  deleteUser
);

// @desc get all User
router.get("/", allUsers);

// @desc get a single User
router.get("/:id", getUserValidator, getUser);

// @desc Uploaded profile image
// @access Protect
router.post(
  "/profile-photo-upload",
  requireSignIn,
  alowedTo("user", "admin"),
  uploadProfileImage,
  profilePhotoUpload
);

// @desc Who view my profile
router.get(
  "/profile-viewers/:id",
  requireSignIn,
  alowedTo("user", "admin"),
  whoViewMyProfileValidator,
  whoViewMyProfile
);

// @desc Follow
router.get(
  "/following/:id",
  requireSignIn,
  alowedTo("user", "admin"),
  followValidator,
  following
);

// @desc unfollow
router.get(
  "/unfollow/:id",
  requireSignIn,
  alowedTo("user", "admin"),
  followValidator,
  Unfollowing
);

module.exports = router;
