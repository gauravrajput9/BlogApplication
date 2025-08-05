import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    // If already connected, skip re-connecting
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      bufferCommands: false,
    });

    isConnected = true;
    console.log("MongoDB connected:", db.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
