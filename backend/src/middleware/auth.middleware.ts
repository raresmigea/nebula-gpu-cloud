import { Request, Response, NextFunction } from "express";
import { getApiKey } from "../services/apiKey.service";

export function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth)
    return res.status(401).json({ error: "Missing API key" });

  const key = auth.replace("Bearer ", "");
  const apiKey = getApiKey(key);

  if (!apiKey)
    return res.status(403).json({ error: "Invalid API key" });

  (req as any).apiKey = apiKey;
  next();
}
