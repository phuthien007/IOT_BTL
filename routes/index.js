// setup router
const express = require("express");
const router = express.Router();

// api comiple code
// setup prefix api
router.use("/compile", require("./compile.router.js"));
router.use("/user", require("./user.router.js"));

module.exports = router;
