const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hostel = require('./models/Hostel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('MongoDB connected...');

  const hostelsData = [
    {
      name: 'UTown Residence',
      description: 'UTown Residence, also known as UTR, is located in the heart of NUS University Town. It is the first of its kind in Singapore’s higher learning landscape where both undergraduate and graduate students live and learn in close proximity. The design of the residence emphasises open common areas, and the architecture fosters a sense of community and cross-disciplinary discussion. UTR oversees the large Town Green, which is a big green space for students to gather, play sports or even have a picnic. UTR consists of the North and South Tower, which can house up to 1,700 residents.',
      price: 600,
      type: 'Student Residence',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2Futown_residence_07.jpg?alt=media',
      averageRating: 4.5,
      ratings: [5, 4, 4, 5, 5],
      latitude: 1.3052,
      longitude: 103.7739
    },
    {
      name: 'PGP Residence',
      description: 'Nestled in a valley near the Kent Ridge MRT station, the PGP Residence (PGPR) beckons to all students who wish to live in a condominium-like hostel with air-conditioned rooms, lounges, study rooms, music rooms as well as sports facilities such as badminton, basketball, tennis courts and a gym. This is not all that PGPR can offer you. Here are some of the other things you can look forward including a diverse multicultural community with residents hailing from 68 countries to strong pastoral care from the residential staff and student leaders. ',
      price: 700,
      type: 'Student Residence',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2Fpgp_residence.jpg?alt=media',
      averageRating: 3.8,
      ratings: [4, 3, 4, 3, 4],
      latitude: 1.2917,
      longitude: 103.7796
    }
  ];

  try {
    console.log('Inserting hostels...');
    const result = await Hostel.insertMany(hostelsData);
    console.log('Hostels inserted:', result);
  } catch (err) {
    console.error('Error inserting hostels:', err);
  } finally {
    mongoose.connection.close();
  }
});
