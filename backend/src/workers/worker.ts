import { Worker } from "bullmq";
import { redis } from "../config/redis";

const worker = new Worker(
  "inference",
  async job => {
    const { prompt, model } = job.data;

    // Simulate GPU processing delay
    await new Promise(res =>
      setTimeout(res, 500 + Math.random() * 1500)
    );

    return {
      output: `Model(${model}) response to: ${prompt}`
    };
  },
  { connection: redis,
    concurrency: 2
   }
);

worker.on("completed", job => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed`, err);
});
