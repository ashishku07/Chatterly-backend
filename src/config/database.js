const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔑 MONGO_URI:", process.env.MONGO_URI); // Debug print
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = connectDB;


