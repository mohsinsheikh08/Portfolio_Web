const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            bufferCommands: false,
            maxPoolSize: 10
        });
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.log(`❌ MongoDB connection error: ${error.message}`);
    }
};

module.exports = connectDB;