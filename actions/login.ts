"use server";

import { LoginSchema, loginSchema } from "@/schemas";

export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  return { success: "Email sent!" };
};
