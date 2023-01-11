const express = require("express");
const router = express.Router();

const {
  createCategory,
  updateCategory,
  allCategories,
  getCategory,
  deleteCategory,
} = require("./../controllers/categoryCtr");

// @desc Create Category
router.post("/", createCategory);

// @desc Update Category
router.put("/:id", updateCategory);

// @desc get all Category
router.get("/", allCategories);

// @desc get a single Category
router.get("/:id", getCategory);

// @desc Delete a Category
router.delete("/:id", deleteCategory);

module.exports = router;
