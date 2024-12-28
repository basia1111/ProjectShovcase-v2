"use server";

import { registerCredentials } from "@lib/auth/registerCredentials";
import { JSX } from "react";

export const register = async (state: "Fill all the fields." | JSX.Element | "success" | null, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await registerCredentials(name, email, password);

  if (response) {
    return response;
  } else {
    return state;
  }
};
