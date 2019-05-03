const mongoose = require('mongoose');

const { Schema } = mongoose;

const EatingRoomsSchema = new Schema({
    user: { type: String },
    title: { type: String },
    date: { type: Date },
    address: { type: String },
    restaurant: { type: String },
    party_size: { type: Number },
    participants: [{ type: String }],
    image_url: {type : String}
});


mongoose.model('EatingRooms', EatingRoomsSchema);
