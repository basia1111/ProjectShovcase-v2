'use server';

import connectDB from '@lib/db';
import User from '@models/User';

export const findUser = async (email: string) => {
  await connectDB();

  if (!email) {
    return null;
  }

  const user = await User.findOne({ email });
  if (!user) return null;

  return { ...user.toObject(), socialMedia: { ...user.socialMedia }, id: user._id.toString() };
};
