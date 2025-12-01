import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { environment } from "./config/environment";
import { errorHandler } from "./middlewares/errorHandler";
import soundRoutes from "./routes/sound.routes";
import mixRoutes from "./routes/mix.routes";

export const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 + 1000,
  max: 200,
});

app.use(helmet());
app.use(
  cors({
    origin:
      environment.CLIENT_ORIGINS.length > 0 ? environment.CLIENT_ORIGINS : true,
  })
);
app.use(limiter);
app.use(express.json());

app.use("/api/sound", soundRoutes);
app.use("/api/mix", mixRoutes);

app.use(errorHandler);
