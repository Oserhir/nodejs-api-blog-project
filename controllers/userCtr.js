const User = require("../model/User");
const handlers = require("./handlersFactory");

// @Desc Create a User
exports.createUser = handlers.createOne(User);

exports.updateUser = handlers.updateOne(User, "user");
exports.allUsers = (req, res) => {};
exports.getUser = (req, res) => {};

// @Desc Delete a User
exports.deleteUser = handlers.deleteOne(User, "user");
