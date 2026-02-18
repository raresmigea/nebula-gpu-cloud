import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis";

const WINDOW_SECONDS = 60;

export async function rateLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.apiKey) {
      return res.status(500).json({ error: "API key missing in request" });
    }

    const apiKey = req.apiKey;
    const redisKey = `rate:${apiKey.key}`;

    const current = await redis.incr(redisKey);

    // Set expiry only on first increment
    if (current === 1) {
      await redis.expire(redisKey, WINDOW_SECONDS);
    }

    const ttl = await redis.ttl(redisKey);
    const remaining = Math.max(apiKey.rateLimit - current, 0);

    // Add rate limit headers (important for production readiness)
    res.setHeader("X-RateLimit-Limit", apiKey.rateLimit);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", ttl);

    if (current > apiKey.rateLimit) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        limit: apiKey.rateLimit,
        remaining: 0,
        resetInSeconds: ttl
      });
    }

    next();
  } catch (err) {
    next(err);
  }
}
