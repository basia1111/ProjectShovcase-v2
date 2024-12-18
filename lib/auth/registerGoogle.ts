"use server";

import connectDB from "@lib/db";
import User from "@models/User";

type GoogleData = {
  name: string;
  email: string;
  image: string;
};
export const registerGoogle = async ({ name, email, image }: GoogleData) => {
  try {
    await connectDB();

    if (!name || !email) {
      return null;
    }

    image = image.replaceAll("s96-c", "s192-c");
    const user = new User({ name, email, image, authProvider: "google" });
    const savedUser = await user.save();
    return { ...savedUser.toObject(), id: savedUser._id.toString() };
  } catch (error) {
    throw new Error("Error during user registration");
  }
};
