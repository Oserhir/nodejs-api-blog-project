const express = require("express");
const app = express();

//
const apiError = require("./utils/apiError");
const { globalErrHandler } = require("./utils/globalErrHandler");

// Access environment variables
require("dotenv").config();

// Connect to database
require("./config/database");

// Middleware
app.use(express.json()); // pass income payload

// Routes
const userRouters = require("./routes/User");
const authRouters = require("./routes/Auth");
const categoryRouters = require("./routes/Category");
const postRouters = require("./routes/Post");
const tagRouters = require("./routes/Tags");

// Routes Middlware
app.use("/api/users", userRouters);
app.use("/api/auth", authRouters);
app.use("/api/categories", categoryRouters);
app.use("/api/posts", postRouters);
app.use("/api/tags", tagRouters);

// 404 Error
app.all("*", (req, res, next) => {
  // create error
  const err = new apiError(`Can't find this route ${req.originalUrl}`, 400);
  // send it to Global errors handling middlware
  next(err);
});

// Global Error Handlers Middleware
app.use(globalErrHandler);

// Listen To Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
