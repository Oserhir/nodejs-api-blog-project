require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
