import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      ssl: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
