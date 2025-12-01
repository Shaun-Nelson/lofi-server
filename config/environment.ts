import dotenv from "dotenv";

dotenv.config();

export const environment = {
  HOSTNAME: process.env.HOSTNAME || "localhost",
  PORT: Number(process.env.PORT) || 8081,
  CLIENT_ORIGINS: process.env.CLIENT_ORIGINS || "",
  MONGO_URI: process.env.MONGO_URI,
  MONGO_URI_TEST: process.env.MONGO_URI_TEST,
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
