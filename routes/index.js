// setup router
const express = require("express");
const { checkLogin } = require("../middlewares/index.js");
const router = express.Router();

// api comiple code
// setup prefix api
router.use("/user", require("./user.router.js"));
router.use("/home", checkLogin, require("./home.router.js"));
router.use("/room", checkLogin, require("./room.router.js"));
router.use("/light", checkLogin, require("./light.router.js"));
router.use("/air", checkLogin, require("./air.router.js"));
router.use("/adruino", require("./adruino.router.js"));
module.exports = router;
