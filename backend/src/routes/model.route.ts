import { Router } from "express";
import { deployModel, listModels } from "../services/model.service";

const router = Router();

/**
 * Deploy a new model
 */
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const model = deployModel(name);
  res.json(model);
});

/**
 * List all models
 */
router.get("/", (req, res) => {
  res.json(listModels());
});

export default router;
