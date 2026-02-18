import { Router } from "express";
import { inferenceQueue } from "../queue/inference.queue";
import { apiKeyAuth } from "../middleware/auth.middleware";
import { QueueEvents } from "bullmq";
import { redis } from "../config/redis";
import { rateLimit } from "../middleware/rateLimit.middleware";
import { trackUsage } from "../middleware/usage.middleware";

const router = Router();
const queueEvents = new QueueEvents("inference", {
  connection: redis
});

router.post(
  "/chat/completions",
  apiKeyAuth,
  rateLimit,
  trackUsage,
  async (req, res, next) => {
    try {
      const { model, messages, stream } = req.body;

      if (!model || !messages) {
        return res.status(400).json({
          error: "model and messages are required"
        });
      }

      const prompt = messages
        ?.map((m: any) => m.content)
        .join("\n");

      const job = await inferenceQueue.add("chat", {
        prompt,
        model
      });

      if (!stream) {
        const result = await job.waitUntilFinished(queueEvents);

        return res.json({
          id: job.id,
          object: "chat.completion",
          created: Date.now(),
          model,
          choices: [
            {
              index: 0,
              message: {
                role: "assistant",
                content: result.output
              },
              finish_reason: "stop"
            }
          ]
        });
      }

      // Streaming mode (SSE)
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const result = await job.waitUntilFinished(queueEvents);

      res.write(
        `data: ${JSON.stringify({
          id: job.id,
          object: "chat.completion.chunk",
          choices: [
            {
              delta: { content: result.output }
            }
          ]
        })}\n\n`
      );

      res.write(`data: [DONE]\n\n`);
      res.end();

    } catch (err) {
      next(err);
    }
  }
);

export default router;
