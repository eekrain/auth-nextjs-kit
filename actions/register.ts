"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { registerSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";

export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, name } = validatedFields.data;

  const exsistingUser = await getUserByEmail(email);
  if (exsistingUser) return { error: "Email is already in use!" };

  try {
    await bcrypt.hash(password, 10).then((hashedPassword) =>
      db.user.create({
        data: { name, email, password: hashedPassword },
      })
    );
    return { success: "User created!" };
  } catch (error) {
    console.error("🚀 ~ register ~ error:", error);
    return { error: "Error while trying to register account!" };
  }
};
