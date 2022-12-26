// router home
const express = require("express");
const router = express.Router();
const HomeModel = require("../models/home.server.model");
const UserModel = require("../models/user.server.model");
const RoomModel = require("../models/room.server.model");
const LightModel = require("../models/light.server.model");
const AirModel = require("../models/air.server.model");

// setup endpoint get all home
router.get("/", async (req, res) => {
  try {
    const homes = await HomeModel.find();
    res.json(homes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get home by id
router.get("/:id", getHome, (req, res) => {
  res.json(res.home);
});

// setup endpoint create home
router.post("/", async (req, res) => {
  const home = new HomeModel(req.body);
  try {
    const newHome = await home.save();
    res.status(201).json(newHome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update home
router.patch("/:id", getHome, async (req, res) => {
  if (req.body.name != null) {
    res.home.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.home.desc = req.body.desc;
  }
  if (req.body.address != null) {
    res.home.address = req.body.address;
  }
  if (req.body.statusRegister != null) {
    res.home.statusRegister = req.body.statusRegister;
  }
  if (req.body.statusUse != null) {
    res.home.statusUse = req.body.statusUse;
  }
  try {
    const updatedHome = await res.home.save();
    res.json(updatedHome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete home
router.delete("/:id", getHome, async (req, res) => {
  try {
    await res.home.remove();
    res.json({ message: "Deleted Home" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get all room
router.get("/:id/rooms", getHome, async (req, res) => {
  try {
    const rooms = await RoomModel.find({ home: res.home._id });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// setup endpoint get room by id
router.get("/:id/rooms/:id", getHome, getRoom, (req, res) => {
  res.json(res.room);
});

// setup endpoint create room
router.post("/:id/rooms", getHome, async (req, res) => {
  const room = new RoomModel(req.body);
  room.home = res.home;
  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint update room
router.patch("/:id/rooms/:id", getHome, getRoom, async (req, res) => {
  if (req.body.name != null) {
    res.room.name = req.body.name;
  }
  if (req.body.desc != null) {
    res.room.desc = req.body.desc;
  }
  try {
    const updatedRoom = await res.room.save();
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// setup endpoint delete room
router.delete("/:id/rooms/:id", getHome, getRoom, async (req, res) => {
  try {
    await res.room.remove();
    res.json({ message: "Deleted Room" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// middleware get home by id
async function getHome(req, res, next) {
  let home;
  try {
    home = await HomeModel.findById(req.params.id);
    if (home == null) {
      return res.status(404).json({ message: "Cannot find home" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.home = home;
  next();
}

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
