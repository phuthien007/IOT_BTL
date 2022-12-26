const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Air = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  temp: {
    type: Number,
    required: true,
    default: 0,
  },
  humi: {
    type: Number,
    required: true,
    default: 0,
  },
  desc: {
    type: String,
    trim: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  // nameAir: String,
  // temp: Number,
  // humi: Number,
  // time: { type: Date, default: Date.now },
});

const airModel = mongoose.model("Airs", Air);

module.exports = airModel;
