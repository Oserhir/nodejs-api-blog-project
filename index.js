const express = require("express");
const app = express();

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

// Listen To Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
