import User from '@models/User';
import bcrypt from 'bcryptjs';
import connectDB from '@lib/db';

export const verifyUser = async (email: string, password: string) => {
  await connectDB();

  if (!email || !password) {
    throw new Error('Please provide both email and password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  };
};

export default verifyUser;
