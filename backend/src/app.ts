import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import healthRouter from "./routes/health.route";
import { errorHandler } from "./middleware/error.middleware";
import apiKeyRouter from "./routes/apikey.route";
import chatRouter from "./routes/chat.route";
import metricsRouter from "./routes/metrics.route";
import modelRouter from "./routes/model.route";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "Nebula GPU API" });
});
app.use("/apikeys", apiKeyRouter);
app.use("/health", healthRouter);
app.use("/v1", chatRouter);
app.use("/metrics", metricsRouter);
app.use("/models", modelRouter);

app.use(errorHandler);

export default app;
