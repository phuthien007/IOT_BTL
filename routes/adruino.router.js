// router home
const express = require("express");
const router = express.Router();
const client = require("../mqtt");

// setup endpoint get all home
router.get("/turn-on-led", async (req, res) => {
  client.publish("20194352", "0", { qos: 1 }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Message sent");
    res.send("Message sent");
    // client.end();
  });
});
router.get("/turn-off-led", async (req, res) => {
  client.publish("20194352", "1", { qos: 1 }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Message sent");
    res.send("Message sent");
    // client.end();
  });
});
router.get("/turn-on-freezer", async (req, res) => {
  client.publish("20194352", "2", { qos: 1 }, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Message sent");
    res.send("Message sent");
    // client.end();
  });
});

module.exports = router;
