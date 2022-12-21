// router light
const express = require("express");
const router = express.Router();

const LightModel = require("../models/light.server.model");
const RoomModel = require("../models/room.server.model");

// setup endpoint get all light
router.get("/", async (req, res) => {
  try {
    const lights = await LightModel.find();
    res.json(lights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get light by id
router.get("/:id", getLight, (req, res) => {
  res.json(res.light);
});

// setup endpoint create light
router.post("/", async (req, res) => {
  const light = new LightModel(req.body);
  try {
    const newLight = await light.save();
    res.status(201).json(newLight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update light
router.patch("/:id", getLight, async (req, res) => {
  if (req.body.name != null) {
    res.light.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.light.desc = req.body.desc;
  }
  if (req.body.status != null) {
    res.light.status = req.body.status;
  }
  try {
    const updatedLight = await res.light.save();
    res.json(updatedLight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete light
router.delete("/:id", getLight, async (req, res) => {
  try {
    await res.light.remove();
    res.json({ message: "Deleted Light" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware get light by id
async function getLight(req, res, next) {
  let light;
  try {
    light = await LightModel.findById(req.params.id);
    if (light == null) {
      return res.status(404).json({ message: "Cannot find light" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.light = light;
  next();
}

module.exports = router;
