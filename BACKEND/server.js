const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5002; //Backend URL

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/MistyEMS';

mongoose.connect(URL)
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

  const studentRouter = require('./routes/Student');
  app.use('/Student', studentRouter); //Check this line

app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
});




