const User = require("../model/User");
const handlers = require("./handlersFactory");

// @Desc Create a User
exports.createUser = handlers.createOne(User);

// @Desc Update User
exports.updateUser = handlers.updateOne(User, "user");

// @Desc Get All User
exports.allUsers = handlers.getAll(User);

// @Desc Get Single User
exports.getUser = handlers.getOne(User, "user");

// @Desc Delete a User
exports.deleteUser = handlers.deleteOne(User, "user");
