import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/tables.ts",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
