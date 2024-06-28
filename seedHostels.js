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
/*      {
      name: 'UTown Residence',
      description: 'UTown Residence, also known as UTR, is located in the heart of NUS University Town. It is the first of its kind in Singapore’s higher learning landscape where both undergraduate and graduate students live and learn in close proximity. The design of the residence emphasises open common areas, and the architecture fosters a sense of community and cross-disciplinary discussion. UTR oversees the large Town Green, which is a big green space for students to gather, play sports or even have a picnic. UTR consists of the North and South Tower, which can house up to 1,700 residents.',
      price: 636,
      type: 'Student Residence 4-Bdrm Apt (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown_residence.jpg?alt=media&token=05ca08dc-1dc0-40d5-a085-a0500fdacd6f',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown%204-bedrm%20apt%20bedrm.jpg?alt=media&token=7a97b262-7002-4b64-8d05-467ebe0b317c',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown%204-bedrm%20Apt%20living%20room.jpg?alt=media&token=ca338917-14ba-4f7b-a13f-0d8db008261d',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown%204-bedrm%20toilet.jpg?alt=media&token=1aeddc92-c695-45a4-84a5-963cb9af018b'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3052,
      longitude: 103.7739,
      savedBy: [] // Initialize with an empty array
    }, */
    {
      name: 'PGP Residence',
      description: 'Nestled in a valley near the Kent Ridge MRT station, the PGP Residence (PGPR) beckons to all students who wish to live in a condominium-like hostel with air-conditioned rooms, lounges, study rooms, music rooms as well as sports facilities such as badminton, basketball, tennis courts and a gym. This is not all that PGPR can offer you. Here are some of the other things you can look forward including a diverse multicultural community with residents hailing from 68 countries to strong pastoral care from the residential staff and student leaders.',
      price: 688,
      type: 'Student Residence Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence.jpg?alt=media&token=56b3a87d-458b-419a-a0b6-fe0d814c3e48',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=6830cd75-bec0-4f1f-b401-92bb6cf25adb',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20lounge.jpg?alt=media&token=3e47043a-efc5-4c6b-9231-bd8c365410f9',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20pantry.jpg?alt=media&token=74dd67db-bcd8-49fc-9a69-311da900bda7'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }
 
/*     {
        name: 'PGP Residence',
        description: 'Nestled in a valley near the Kent Ridge MRT station, the PGP Residence (PGPR) beckons to all students who wish to live in a condominium-like hostel with air-conditioned rooms, lounges, study rooms, music rooms as well as sports facilities such as badminton, basketball, tennis courts and a gym. This is not all that PGPR can offer you. Here are some of the other things you can look forward including a diverse multicultural community with residents hailing from 68 countries to strong pastoral care from the residential staff and student leaders.',
        price: 608,
        type: 'Student Residence Single Type C (Non-AC)',
        imageUrls: [
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence.jpg?alt=media&token=56b3a87d-458b-419a-a0b6-fe0d814c3e48',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=6830cd75-bec0-4f1f-b401-92bb6cf25adb',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20lounge.jpg?alt=media&token=3e47043a-efc5-4c6b-9231-bd8c365410f9',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20pantry.jpg?alt=media&token=74dd67db-bcd8-49fc-9a69-311da900bda7'
        ],
        averageRating: 0,
        ratings: [],
        latitude: 1.2917,
        longitude: 103.7796,
        savedBy: [] // Initialize with an empty array
      } */
  ];

  try {
/*     console.log('Deleting existing hostels...');
    await Hostel.deleteMany({}); // Clear existing data */

    console.log('Inserting new hostels...');
    const result = await Hostel.insertMany(hostelsData);
    console.log('Hostels inserted:', result);
  } catch (err) {
    console.error('Error inserting hostels:', err);
  } finally {
    mongoose.connection.close();
  }
});
