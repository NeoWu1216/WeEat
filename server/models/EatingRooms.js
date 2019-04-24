const mongoose = require('mongoose');

const { Schema } = mongoose;

const EatingRoomsSchema = new Schema({
    user: { type: String },
    title: { type: String },
    date: { type: Date },
    address: { type: String },
    restaurant: { type: String },
    party_size: { type: Number },
});


mongoose.model('EatingRooms', EatingRoomsSchema);
