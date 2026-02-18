export type Model = {
  name: string;
  deployedAt: number;
};

const models: Model[] = [];

/**
 * Deploy a new model
 */
export function deployModel(name: string): Model {
  const model = { name, deployedAt: Date.now() };
  models.push(model);
  return model;
}

/**
 * List all deployed models
 */
export function listModels(): Model[] {
  return models;
}
