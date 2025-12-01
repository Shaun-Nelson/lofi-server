import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";

const mockMongoose = () => {
  const on = jest.fn();
  const connection = { on, host: "localhost", name: "lofi" };
  const connect = jest
    .fn<(uri?: string, options?: unknown) => Promise<typeof connection>>()
    .mockResolvedValue(connection);

  jest.doMock("mongoose", () => ({
    __esModule: true,
    default: { connection, connect },
    connection,
    connect,
  }));

  return { connect, connection };
};

const loadConnectDB = async () => {
  const module = await import("../../database/connection");
  return module.connectDB;
};

describe("connectDB", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("uses the provided URI when supplied", async () => {
    const { connect, connection } = mockMongoose();
    jest.doMock("../../config/environment", () => ({
      environment: {
        MONGO_URI: "mongodb://prod",
        MONGO_URI_TEST: "mongodb://test",
        DB_CONNECT_TIMEOUT_MS: 5000,
      },
    }));
    const connectDB = await loadConnectDB();
    const customUri = "mongodb://custom";

    const result = await connectDB(customUri);

    expect(connect).toHaveBeenCalledWith(
      customUri,
      expect.objectContaining({ serverSelectionTimeoutMS: 5000 })
    );
    expect(connection.on).toHaveBeenCalledWith(
      "connected",
      expect.any(Function)
    );
    expect(connection.on).toHaveBeenCalledWith("error", expect.any(Function));
    expect(connection.on).toHaveBeenCalledWith(
      "disconnected",
      expect.any(Function)
    );
    expect(result).toBe(connection);
  });

  it("falls back to test URI when NODE_ENV=test and no argument is provided", async () => {
    process.env.NODE_ENV = "test";
    const { connect } = mockMongoose();
    jest.doMock("../../config/environment", () => ({
      environment: {
        MONGO_URI: "mongodb://prod",
        MONGO_URI_TEST: "mongodb://test",
        DB_CONNECT_TIMEOUT_MS: 5000,
      },
    }));
    const connectDB = await loadConnectDB();

    await connectDB();

    expect(connect).toHaveBeenCalledWith(
      "mongodb://test",
      expect.objectContaining({ serverSelectionTimeoutMS: 5000 })
    );
  });

  it("throws if no URI can be resolved", async () => {
    const { connect } = mockMongoose();
    jest.doMock("../../config/environment", () => ({
      environment: {
        MONGO_URI: undefined,
        MONGO_URI_TEST: undefined,
        DB_CONNECT_TIMEOUT_MS: 5000,
      },
    }));
    const connectDB = await loadConnectDB();

    await expect(connectDB()).rejects.toThrow("MONGO_URI is not defined");
    expect(connect).not.toHaveBeenCalled();
  });
});
