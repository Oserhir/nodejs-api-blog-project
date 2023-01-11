const mongoose = require("mongoose");

// Create SCHEMA
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is Required"],
    },

    lastname: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    image: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is Required"],
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["User", "Guess", "Editor"],
      default: "User",
    },

    viewdBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

// Create Model
const User = mongoose.model("User", UserModel);
module.exports = User;
