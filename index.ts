import { app } from "./app";
import { connectDB } from "./database/connection";
import { logger } from "./utils/logger";
import { environment } from "./config/environment";

const startServer = async () => {
  try {
    await connectDB();

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
