const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Air = new Schema({
    nameAir: String,
    temp: Number,
    humi: Number,
    time: {type: Date, default: Date.now}
})

const Light = new Schema({
    nameLight: String,
    typeLight: String,
    active: Boolean,
})

const Room = new Schema({
    nameRoom: String,
    typeRoom: String,
    air: Air,
    lights: [Light]

})

const HomeSchema = new Schema({
    _id: String,
    nameHome: String,
    pass: String,
    rooms: [Room]
})

const Home = mongoose.model('Home', HomeSchema)

module.exports = Home;

