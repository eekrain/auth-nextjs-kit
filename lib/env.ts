import { z, ZodError } from "zod";

const envSchema = z.object({
  DB_FILE_NAME: z.string().min(1),
});

try {
  envSchema.parse(process.env);
} catch (e) {
  if (e instanceof ZodError) {
    console.error("Environment validation error:", e.errors);
  }
}

export default envSchema.parse(process.env);
