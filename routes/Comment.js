const express = require("express");
const router = express.Router();

const { createComment } = require("../controllers/commentCtr");

const {
  createCommentValidator,
} = require("../utils/validators/commentValidator");

const { requireSignIn, alowedTo } = require("../middlwares/authMiddlwares");

router.post(
  "/",
  requireSignIn,
  alowedTo("admin"),
  createCommentValidator,
  createComment
);

module.exports = router;
