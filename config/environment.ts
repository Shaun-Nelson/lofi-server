import dotenv from "dotenv";

dotenv.config();

export const HOSTNAME = "localhost";
export const PORT = Number(process.env.PORT) || 8081;
export const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS || "";
export const MONGO_URI = process.env.MONGO_URI;
export const MONGO_URI_TEST = process.env.MONGO_URI_TEST;
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";

export const environment = {
  HOSTNAME,
  PORT,
  CLIENT_ORIGINS,
  MONGO_URI,
  MONGO_URI_TEST,
  LOG_LEVEL,
};
