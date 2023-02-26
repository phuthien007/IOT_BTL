// Basic app setup
var express = require("express");
var request = require("request");
const db = require("./database");
const router = require("./routes");
const logger = require("./config/logger");
const dotenv = require("dotenv");
require("./mqtt");
var app = express();
db();
dotenv.config();
var port = process.env.PORT || 3000;
// use the express-static middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up the view engine
app.set("view engine", "ejs");

// // Set up the routes
// app.get("/", function (req, res) {
//   res.render("index");
// });
app.use("/api", router);

// Start the server
app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});
