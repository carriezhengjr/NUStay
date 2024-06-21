const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  imageUrl: { type: String, required: true },
  averageRating: { type: Number, required: true },
  ratings: { type: [Number], required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true }
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
