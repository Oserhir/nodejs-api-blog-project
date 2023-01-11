const express = require("express");
const app = express();

// access environment variables
require("dotenv").config();

// connect to database
require("./config/database");

// Listen To Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
