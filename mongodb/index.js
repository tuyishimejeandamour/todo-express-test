const mongoose = require('mongoose');
const settings = require('../controllers/settings')

async function connectMongoDb() {
   await mongoose.connect(settings.dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('[INFO] Connect to DB success!');
    });
}

module.exports.connectMongoDb = connectMongoDb