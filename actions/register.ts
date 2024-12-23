"use server";

import { registerSchema, RegisterSchema } from "@/schemas";

export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  return { success: "Email sent!" };
};
