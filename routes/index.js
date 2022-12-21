// setup router
const express = require("express");
const router = express.Router();

// api comiple code
// setup prefix api
router.use("/user", require("./user.router.js"));
router.use("/home", require("./home.router.js"));
router.use("/room", require("./room.router.js"));
router.use("/light", require("./light.router.js"));
router.use("/air", require("./air.router.js"));

module.exports = router;
