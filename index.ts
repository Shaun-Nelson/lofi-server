import { app } from "./app.ts";
import { connectDB } from "./config/database";
import { logger } from "./utils/logger";
import { environment } from "./config/environment";

const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      await connectDB;
    }

    app.listen(environment.PORT, environment.HOSTNAME, () => {
      logger.info(
        `Lo-fi server listening on ${environment.HOSTNAME}:${environment.PORT}`
      );
    });
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
};

void startServer();
