const handle = require("./handlersFactory");
const Category = require("./../model/Category");

exports.createCategory = handle.createOne(Category);
exports.updateCategory = handle.updateOne(Category, "category");
exports.allCategories = handle.getAll(Category);
exports.getCategory = handle.getOne(Category, "category");
exports.deleteCategory = handle.deleteOne(Category, "category");
