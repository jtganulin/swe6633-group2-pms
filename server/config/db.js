const mongoose = require('mongoose');

const connectDB = async () => {

  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected at ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }

}

module.exports = connectDB;
