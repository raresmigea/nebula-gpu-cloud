import { Router } from "express";
import { redis } from "../config/redis";

const router = Router();

/**
 * Returns usage metrics per API key
 */
router.get("/", async (req, res) => {
  try {
    const keys = await redis.keys("usage:*");
    const stats = [];

    for (const key of keys) {
      const data = await redis.hgetall(key);
      stats.push({
        apiKey: key.replace("usage:", ""),
        requests: Number(data.requests || 0),
        lastUsed: data.lastUsed ? new Date(Number(data.lastUsed)) : null
      });
    }

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to get metrics" });
  }
});

export default router;
