import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
