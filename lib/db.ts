import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      ssl: true,
    });
    console.log("Connected to mongo DB");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
