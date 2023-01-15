const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Create Schema
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

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    viewers: [
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

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    plan: {
      type: String,
      enum: ["Free", "Premium", "Pro"],
      default: "Free",
    },

    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

// Get Full Name
UserSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

// Get intials
UserSchema.virtual("intials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

// Get post counts
UserSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

//get followers count
UserSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

//get followers count
UserSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

//get viewers count
UserSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

//get blocked count
UserSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});

// Hash Password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create Model
const User = mongoose.model("User", UserSchema);
module.exports = User;
