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
  block,
  unblock,
  block_admin,
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
  alowedTo("user"),
  uploadProfileImage,
  profilePhotoUpload
);

// @desc Who view my profile
// @access Protect
router.get(
  "/profile-viewers/:id",
  requireSignIn,
  alowedTo("user"),
  whoViewMyProfileValidator,
  whoViewMyProfile
);

// @desc Follow
// @access Protect
router.get(
  "/following/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  following
);

// @desc unfollow
// @access Protect
router.get(
  "/unfollow/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  Unfollowing
);

// @desc Block
// @access Protect
router.get(
  "/block/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  block
);

// @desc unblocking
// @access Protect
router.get(
  "/unblock/:id",
  requireSignIn,
  alowedTo("user"),
  followValidator,
  unblock
);

// @desc block
// @access Admin
router.get(
  "/admin-block/:id",
  requireSignIn,
  alowedTo("admin"),
  followValidator,
  block_admin
);

module.exports = router;
