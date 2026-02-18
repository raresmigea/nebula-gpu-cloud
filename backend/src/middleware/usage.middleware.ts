import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis";

/**
 * Track API key usage in Redis.
 * Stores:
 * - requests: total requests per API key
 * - lastUsed: timestamp of last request
 */
export async function trackUsage(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.apiKey) return next();

    const apiKey = req.apiKey;
    const usageKey = `usage:${apiKey.key}`;

    await redis.hincrby(usageKey, "requests", 1);
    await redis.hset(usageKey, "lastUsed", Date.now().toString());

    next();
  } catch (err) {
    next(err);
  }
}
