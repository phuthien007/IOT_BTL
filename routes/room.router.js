// router room
const express = require("express");
const router = express.Router();
const RoomModel = require("../models/room.server.model");
const HomeModel = require("../models/home.server.model");
const LightModel = require("../models/light.server.model");
const AirModel = require("../models/air.server.model");

// setup endpoint get all room
router.get("/", async (req, res) => {
  try {
    const rooms = await RoomModel.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get room by id
router.get("/:id", getRoom, (req, res) => {
  res.json(res.room);
});

// setup endpoint create room
router.post("/", async (req, res) => {
  const room = new RoomModel(req.body);
  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update room
router.patch("/:id", getRoom, async (req, res) => {
  if (req.body.name != null) {
    res.room.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.room.desc = req.body.desc;
  }
  if (req.body.type != null) {
    res.body.type = req.body.type;
  }
  try {
    const updatedRoom = await res.room.save();
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete room
router.delete("/:id", getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Deleted Room" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get all light in room
router.get("/:id/light", getRoom, async (req, res) => {
  try {
    const lights = await LightModel.find({ room: req.params.id });
    res.json(lights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get all air in room
router.get("/:id/air", getRoom, async (req, res) => {
  try {
    const airs = await AirModel.find({ room: req.params.id });
    res.json(airs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get all home in room
router.get("/:id/home", getRoom, async (req, res) => {
  try {
    const homes = await HomeModel.find({ room: req.params.id });
    res.json(homes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint add light to room
router.post("/:id/light", getRoom, async (req, res) => {
  const light = new LightModel(req.body);
  light.room = res.room;
  try {
    const newLight = await light.save();
    res.status(201).json(newLight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint add air to room
router.post("/:id/air", getRoom, async (req, res) => {
  const air = new AirModel(req.body);
  air.room = res.room;
  try {
    const newAir = await air.save();
    res.status(201).json(newAir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update light in room
router.patch("/:id/light/:lightId", getRoom, async (req, res) => {
  if (req.body.name != null) {
    res.room.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.room.desc = req.body.desc;
  }
  try {
    const updatedLight = await res.room.save();
    res.json(updatedLight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update air in room
router.patch("/:id/air/:airId", getRoom, async (req, res) => {
  if (req.body.name != null) {
    res.room.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.room.desc = req.body.desc;
  }
  try {
    const updatedAir = await res.room.save();
    res.json(updatedAir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete light in room
router.delete("/:id/light/:lightId", getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Deleted Light" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint delete air in room
router.delete("/:id/air/:airId", getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Deleted Air" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware get room by id
async function getRoom(req, res, next) {
  let room;
  try {
    room = await RoomModel.findById(req.params.id);
    if (room == null) {
      return res.status(404).json({ message: "Cannot find room" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.room = room;
  next();
}

module.exports = router;
