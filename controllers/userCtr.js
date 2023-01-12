const User = require("../model/User");
const handlers = require("./handlersFactory");

// @Desc Create a User
exports.createUser = handlers.createOne(User);

exports.updateUser = (req, res) => {};
exports.allUsers = (req, res) => {};
exports.getUser = (req, res) => {};
exports.deleteUser = (req, res) => {};
