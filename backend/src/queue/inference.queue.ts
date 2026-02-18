import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const inferenceQueue = new Queue("inference", {
  connection: redis
});
