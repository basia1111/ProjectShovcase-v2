'use server';

import { registerCredentials } from '@lib/auth/registerCredentials';

export const register = async (_: string | null, formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const response = await registerCredentials(name, email, password);

  return response;
};
