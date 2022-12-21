const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Light = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Rooms",
  },

  // nameLight: String,
  // typeLight: String,
  // active: Boolean,
});

const lightModel = mongoose.model("Lights", Light);

module.exports = lightModel;
