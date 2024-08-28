const mongoose = require('mongoose');
require('dotenv').config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {

    // Attempt to establish a connection to the MongoDB database using the URI stored in the environment variable
    const connect = await mongoose.connect(process.env.MONGO_URI);
    
    // Log a success message if the connection is successful
    console.log("Database connected: ", connect.connection.host, connect.connection.name);

  } catch (err) {
    // Log any error that occurs during the connection attempt
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;