import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { environment } from "./config/environment";
import { errorHandler } from "./middlewares/errorHandler";
// import mixRoutes from "./routes/mixRoutes"

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

// app.use("/api/mix", mixRoutes)

app.use(errorHandler);
