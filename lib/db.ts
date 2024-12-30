import mongoose from "mongoose";
import Project from "@models/Project";
import User from "@models/User";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGODB_URI!, {
      ssl: true,
    });

    require("@models/Project");
    require("@models/User");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
