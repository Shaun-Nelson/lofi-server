import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { environment } from "./environment";

export const connectDB = async (uri?: string) => {
  const mongoUri =
    uri ||
    (process.env.NODE_ENV === "test"
      ? environment.MONGO_URI_TEST
      : environment.MONGO_URI);

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  mongoose.connection.on("connected", () => {
    logger.info(
      `MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}}`
    );
  });

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });

  await mongoose.connect(mongoUri);
  return mongoose.connection;
};
