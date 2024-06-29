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
/*     {
      name: 'PGP Residence',
      description: 'Nestled in a valley near the Kent Ridge MRT station, the PGP Residence (PGPR) beckons to all students who wish to live in a condominium-like hostel with air-conditioned rooms, lounges, study rooms, music rooms as well as sports facilities such as badminton, basketball, tennis courts and a gym. This is not all that PGPR can offer you. Here are some of the other things you can look forward including a diverse multicultural community with residents hailing from 68 countries to strong pastoral care from the residential staff and student leaders.',
      price: 688,
      type: 'Student Residence Single Type C (AC)',
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

/*     {
      name: 'PGP Pioneer House',
      description: 'Pioneer House (PH), formerly known as “PGP House”, was established in 2017 as a pilot to develop a new type of housing model in NUS. Over the past few years, PH has implemented innovative programmes to provide proactive pastoral care and mentoring to the residents to develop a familial and inclusive residential community. Sense-of-belonging, micro-cultures, and significant networks are some of the approaches which the activities in PH were planned and executed to encourage a balanced and vibrant on-campus living and learning experience for the residents. Our signature Peer Mentorship Programme offers freshmen an opportunity to receive academic guidance and student life-related care from a select group of accomplished seniors known as "Peer Mentors". Resident Fellows and Resident Assistants are also readily available to provide pastoral care and support to all residents. At Pioneer House, every life matters and we welcome you to join our PHamily!',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fph-entrance3.jpg?alt=media&token=123671b8-f696-4101-860c-7bb2b74922c1',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence.jpg?alt=media&token=ed4c35ea-2e78-4913-b81e-b23898a1dbe4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=107a50b1-7b38-43c4-a9cb-d44a71eb4c56',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20lounge.jpg?alt=media&token=619f52f1-74f5-4f66-aea1-434d00c1cfaf',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20pantry.jpg?alt=media&token=4a2d571f-0e68-49df-b4d0-693a386dd7fa',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fquiet-room.jpg?alt=media&token=2f256597-3f17-467a-8757-9cd7b27b0b29'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }  */

/*     {
      name: 'PGP Pioneer House',
      description: 'Pioneer House (PH), formerly known as “PGP House”, was established in 2017 as a pilot to develop a new type of housing model in NUS. Over the past few years, PH has implemented innovative programmes to provide proactive pastoral care and mentoring to the residents to develop a familial and inclusive residential community. Sense-of-belonging, micro-cultures, and significant networks are some of the approaches which the activities in PH were planned and executed to encourage a balanced and vibrant on-campus living and learning experience for the residents. Our signature Peer Mentorship Programme offers freshmen an opportunity to receive academic guidance and student life-related care from a select group of accomplished seniors known as "Peer Mentors". Resident Fellows and Resident Assistants are also readily available to provide pastoral care and support to all residents. At Pioneer House, every life matters and we welcome you to join our PHamily!',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fph-entrance3.jpg?alt=media&token=123671b8-f696-4101-860c-7bb2b74922c1',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence.jpg?alt=media&token=ed4c35ea-2e78-4913-b81e-b23898a1dbe4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=107a50b1-7b38-43c4-a9cb-d44a71eb4c56',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20lounge.jpg?alt=media&token=619f52f1-74f5-4f66-aea1-434d00c1cfaf',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20pantry.jpg?alt=media&token=4a2d571f-0e68-49df-b4d0-693a386dd7fa',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fquiet-room.jpg?alt=media&token=2f256597-3f17-467a-8757-9cd7b27b0b29'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }  */
/*     {
      name: 'PGP Pioneer House',
      description: 'Pioneer House (PH), formerly known as “PGP House”, was established in 2017 as a pilot to develop a new type of housing model in NUS. Over the past few years, PH has implemented innovative programmes to provide proactive pastoral care and mentoring to the residents to develop a familial and inclusive residential community. Sense-of-belonging, micro-cultures, and significant networks are some of the approaches which the activities in PH were planned and executed to encourage a balanced and vibrant on-campus living and learning experience for the residents. Our signature Peer Mentorship Programme offers freshmen an opportunity to receive academic guidance and student life-related care from a select group of accomplished seniors known as "Peer Mentors". Resident Fellows and Resident Assistants are also readily available to provide pastoral care and support to all residents. At Pioneer House, every life matters and we welcome you to join our PHamily!',
      price: 608,
      type: 'House Single Type C (Non-AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fph-entrance3.jpg?alt=media&token=123671b8-f696-4101-860c-7bb2b74922c1',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence.jpg?alt=media&token=ed4c35ea-2e78-4913-b81e-b23898a1dbe4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=107a50b1-7b38-43c4-a9cb-d44a71eb4c56',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20lounge.jpg?alt=media&token=619f52f1-74f5-4f66-aea1-434d00c1cfaf',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20pantry.jpg?alt=media&token=4a2d571f-0e68-49df-b4d0-693a386dd7fa',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fquiet-room.jpg?alt=media&token=2f256597-3f17-467a-8757-9cd7b27b0b29'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }   */

     {
      name: 'PGP Light House',
      description: 'The five panels in our logo represent the five blocks on our grounds that make up the physical space that LightHouse occupies. This physical space gains meaning when students, depicted by the "i", step into the space and commit to our shared vision of creating a community where each resident has the opportunity to embark on this journey of self-discovery. An integral part of this vision is light, represented by the colour yellow, be it living your own light or shining that light to inspire others to do the same. Balancing that light is the colour black, reminiscent of the lows in our journey and the darkness in our lives, a reality that LightHouse both acknowledges and embraces. Our hope and commitment to residents is to build a home that shines light into their lives amidst the darkness, and ultimately empower them to find their light and be a beacon to the people around them.',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Flight%20house.jpeg?alt=media&token=cd130799-14fa-45c9-9838-8782da9e7e0c',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Flighthouse%20Room%20.jpeg?alt=media&token=652a4428-b955-4bc9-821e-6d696d4462fb',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Fpgp%20residence%20pantry.jpg?alt=media&token=0a111463-c426-4312-9b4d-a875bd66b294',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Fphoto_2023-07-20_16-29-21.jpg?alt=media&token=113b0928-852a-4af2-a99c-a2c160be4431'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2904,
      longitude: 103.7817,
      savedBy: [] // Initialize with an empty array
    }   
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
