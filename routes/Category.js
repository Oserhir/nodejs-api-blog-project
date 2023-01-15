const express = require("express");
const router = express.Router();

const {
  createCategoryValidator,
} = require("./../utils/validators/categoryValidator");

const {
  createCategory,
  updateCategory,
  allCategories,
  getCategory,
  deleteCategory,
} = require("./../controllers/categoryCtr");

const { requireSignIn, alowedTo } = require("../middlwares/authMiddlwares");

// @desc Create Category
router.post(
  "/",
  requireSignIn,
  alowedTo("admin"),
  createCategoryValidator,
  createCategory
);

// @desc Update Category
router.put("/:id", updateCategory);

// @desc get all Category
router.get("/", allCategories);

// @desc get a single Category
router.get("/:id", getCategory);

// @desc Delete a Category
router.delete("/:id", deleteCategory);

module.exports = router;
