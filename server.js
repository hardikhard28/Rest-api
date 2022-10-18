const { Router } = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const { errorHandler } = require("./middleware/errorhandler");
const { router } = require("./routes");
const { CustomErrorHandler } = require("./services/customErrorHandler");
const path = require("path");
const app = express();
require('dotenv').config();
const cors = require("cors");
console.log(process.env.APP_PORT)
mongoose.connect(
  "mongodb+srv://hardik:1234@cluster0.syh343j.mongodb.net/?retryWrites=true&w=majority",
  {}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
  
});
