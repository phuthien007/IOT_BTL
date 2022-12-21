// router air
const express = require("express");
const router = express.Router();

const AirModel = require("../models/air.server.model");
const RoomModel = require("../models/room.server.model");

// setup endpoint get all air
router.get("/", async (req, res) => {
  try {
    const airs = await AirModel.find();
    res.json(airs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get air by id
router.get("/:id", getAir, (req, res) => {
  res.json(res.air);
});

// setup endpoint create air
router.post("/", async (req, res) => {
  const air = new AirModel(req.body);
  try {
    const newAir = await air.save();
    res.status(201).json(newAir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update air
router.patch("/:id", getAir, async (req, res) => {
  if (req.body.name != null) {
    res.air.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.air.desc = req.body.desc;
  }
  if (req.body.status != null) {
    res.air.status = req.body.status;
  }
  try {
    const updatedAir = await res.air.save();
    res.json(updatedAir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete air
router.delete("/:id", getAir, async (req, res) => {
  try {
    await res.air.remove();
    res.json({ message: "Deleted Air" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAir(req, res, next) {
  let air;
  try {
    air = await AirModel.findById(req.params.id);
    if (air == null) {
      return res.status(404).json({ message: "Cannot find air" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.air = air;
  next();
}

module.exports = router;
