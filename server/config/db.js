const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      family: 4, // Using IPv6 has caused issues with Mongoose in the past
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: process.env.MONGO_TIMEOUT || 2000,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => {
      console.log("Mongoose Error \n" + err);
      process.exit(1);
    });

  // Log any errors that occur after the initial connection
  mongoose.connection.on('error', err => {
    console.log("MongoDB encountered an error: " + err);
  });
};

module.exports = connectDB;
