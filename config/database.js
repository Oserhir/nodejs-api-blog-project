const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB_URL;
mongoose.set("strictQuery", true);

const Db = mongoose
  .connect(MONGODB)
  .then((connect) => {
    console.log("connect to Database");
  })
  .catch((err) => {
    console.log(err);
  });
