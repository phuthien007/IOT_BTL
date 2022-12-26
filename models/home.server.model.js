const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  statusRegister: {
    type: Boolean,
    default: false,
  },
  statusUse: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "rooms",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Home = mongoose.model("Homes", HomeSchema);

module.exports = Home;
