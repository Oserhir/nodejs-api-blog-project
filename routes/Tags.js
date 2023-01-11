const express = require("express");
const router = express.Router();

const {
  createTag,
  updateTag,
  allTags,
  getTag,
  deleteTag,
} = require("../controllers/tagCtr");

// @desc Create Tag
router.post("/", createTag);

// @desc Update Tag
router.put("/:id", updateTag);

// @desc get all Tags
router.get("/", allTags);

// @desc get a single Tag
router.get("/:id", getTag);

// @desc Delete a Tag
router.delete("/:id", deleteTag);

module.exports = router;
