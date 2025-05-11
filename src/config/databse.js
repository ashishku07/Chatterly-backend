const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shamst0026:Learngetjob91@backenddevtinder.zoaxjnj.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
