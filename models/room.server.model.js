const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: "homes",
  },
  type: {
    type: String,
  },
  desc: {
    type: String,
    trim: true,
  },
  airTemp: {
    type: Schema.Types.ObjectId,
    ref: "airs",
  },
  lights: [
    {
      type: Schema.Types.ObjectId,
      ref: "lights",
    },
  ],
});

const RoomModel = mongoose.model("Rooms", Room);

module.exports = RoomModel;
