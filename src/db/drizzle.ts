import { drizzle } from "drizzle-orm/node-postgres";
import { logger } from "../log/logger";

if (!process.env.DATABASE_URL) {
  logger.fatal("DATABASE_URL was not defined!");
  process.exit(1);
}

export const db = drizzle(process.env.DATABASE_URL!);
