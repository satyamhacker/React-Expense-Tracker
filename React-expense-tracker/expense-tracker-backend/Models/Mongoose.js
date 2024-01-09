const mongoose = require('mongoose');

// Replace 'your_database_url' with the actual connection URL of your MongoDB database
const dbUrl = 'mongodb://127.0.0.1:27017/expeseTracker';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});
