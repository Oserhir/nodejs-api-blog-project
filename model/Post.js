const mongoose = require("mongoose");

// Create SCHEMA
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "post description is required"],
      trim: true,
    },

    image: {
      type: String,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "post category is required"],
    },

    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create Model
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
