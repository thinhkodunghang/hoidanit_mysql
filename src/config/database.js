const mongoose = require('mongoose');
require("dotenv").config();

const connnection = async () => {
  
    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME
    }
    await mongoose.connect(
      process.env.DB_HOST,
      options
    );
    console.log('Connected to MongoDB');
};

module.exports = connnection;

