const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');

// Get all hostels
router.get('/', async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new hostel
router.post('/', async (req, res) => {
  const hostel = new Hostel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    type: req.body.type,
    imageUrl: req.body.imageUrl,
    averageRating: req.body.averageRating,
    ratings: req.body.ratings,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  try {
    const newHostel = await hostel.save();
    res.status(201).json(newHostel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
