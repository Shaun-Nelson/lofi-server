import { environment } from "../config/environment";
import dotenv from "dotenv";

dotenv.config();

type LogLevel = "silent" | "error" | "warn" | "info" | "debug";

const levelFromEnv: LogLevel =
  process.env.NODE_ENV === "test"
    ? "error"
    : (environment.LOG_LEVEL as LogLevel | undefined) || "info";
const levels: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};
const current = levels[levelFromEnv] ?? levels.info;

export const logger = {
  info: (...args: unknown[]) => {
    if (current >= levels.info) console.log("[INFO]", ...args);
  },
  warn: (...args: unknown[]) => {
    if (current >= levels.warn) console.warn("[WARN]", ...args);
  },
  error: (...args: unknown[]) => {
    if (current >= levels.error) console.error("[ERROR]", ...args);
  },
  debug: (...args: unknown[]) => {
    if (current >= levels.debug) console.debug("[DEBUG]", ...args);
  },
};
