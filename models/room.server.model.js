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
    ref: "Homes",
  },
  desc: {
    type: String,
    trim: true,
  },
  airTemp: {
    type: Schema.Types.ObjectId,
    ref: "Airs",
  },
  lights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lights",
    },
  ],
});

const RoomModel = mongoose.model("Rooms", Room);

module.exports = RoomModel;
