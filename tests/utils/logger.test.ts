import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";

type Logger = typeof import("../../utils/logger").logger;

const loadLoggerWithLevel = async (level: string, nodeEnv = "development"): Promise<Logger> => {
  jest.resetModules();
  process.env.NODE_ENV = nodeEnv;
  jest.doMock("dotenv", () => ({ __esModule: true, default: { config: jest.fn() }, config: jest.fn() }));
  jest.doMock("../../config/environment", () => ({
    environment: { LOG_LEVEL: level },
  }));

  const module = await import("../../utils/logger");
  return module.logger;
};

const mockConsoles = () => {
  const info = jest.spyOn(console, "log").mockImplementation(() => {});
  const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
  const error = jest.spyOn(console, "error").mockImplementation(() => {});
  const debug = jest.spyOn(console, "debug").mockImplementation(() => {});

  return { info, warn, error, debug };
};

describe("logger utility", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("emits all levels when LOG_LEVEL=debug", async () => {
    const logger = await loadLoggerWithLevel("debug", "development");
    const spies = mockConsoles();

    logger.info("info");
    logger.warn("warn");
    logger.error("error");
    logger.debug("debug");

    expect(spies.info).toHaveBeenCalledWith("[INFO]", "info");
    expect(spies.warn).toHaveBeenCalledWith("[WARN]", "warn");
    expect(spies.error).toHaveBeenCalledWith("[ERROR]", "error");
    expect(spies.debug).toHaveBeenCalledWith("[DEBUG]", "debug");
  });

  it("suppresses lower-severity logs when LOG_LEVEL=error", async () => {
    const logger = await loadLoggerWithLevel("error", "production");
    const spies = mockConsoles();

    logger.info("info");
    logger.warn("warn");
    logger.error("error");
    logger.debug("debug");

    expect(spies.error).toHaveBeenCalledTimes(1);
    expect(spies.warn).not.toHaveBeenCalled();
    expect(spies.info).not.toHaveBeenCalled();
    expect(spies.debug).not.toHaveBeenCalled();
  });
});
