import { Router } from "express";
import {
  createApiKey,
  listApiKeys
} from "../services/apiKey.service";

const router = Router();

router.post("/", (req, res) => {
  const key = createApiKey();
  res.json(key);
});

router.get("/", (req, res) => {
  res.json(listApiKeys());
});

export default router;
