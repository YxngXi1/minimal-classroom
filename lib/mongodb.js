import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conected to the database of the mongodb");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
