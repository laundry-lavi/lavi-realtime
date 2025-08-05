import mongoose from "mongoose";
import { logger } from "../../log/logger";

if (!process.env.MONGO_URL) {
  logger.fatal("MONGO_URL was not defined!");
  process.exit(1);
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.fatal("Error while connectig MongoDB: " + error);
    process.exit(1);
  }
};
