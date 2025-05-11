const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    return mongoose.connection;
  } catch (err) {
    throw err;
  }
};

module.exports = connectDB;
