const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUser,
  allUsers,
  getUser,
  deleteUser,
} = require("./../controllers/userCtr");

const {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
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

// @desc Update User
// @access Private/Admin
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin"),
  updateUserValidator,
  updateUser
);

// @desc Delete a User
router.delete("/:id", deleteUserValidator, deleteUser);

// @desc get all User
router.get("/", allUsers);

// @desc get a single User
router.get("/:id", getUser);

module.exports = router;
