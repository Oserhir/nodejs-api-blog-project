const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  allUsers,
  getUser,
  deleteUser,
} = require("./../controllers/userCtr");

const { createUserValidator } = require("../utils/validators/userValidator");

// @Desc Create a User
// @access Private/Admin
router.post("/", createUserValidator, createUser);

// @desc Update User
router.put("/:id", updateUser);

// @desc get all User
router.get("/", allUsers);

// @desc get a single User
router.get("/:id", getUser);

// @desc Delete a User
router.delete("/:id", deleteUser);

module.exports = router;
