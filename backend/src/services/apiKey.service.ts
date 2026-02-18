import { v4 as uuid } from "uuid";

export type ApiKey = {
  id: string;
  key: string;
  rateLimit: number;
};

const apiKeys: ApiKey[] = [];

export function createApiKey(): ApiKey {
  const key = `nebula_${uuid()}`;

  const newKey: ApiKey = {
    id: uuid(),
    key,
    rateLimit: 10 // 10 requests per minute
  };

  apiKeys.push(newKey);
  return newKey;
}

export function getApiKey(key: string): ApiKey | undefined {
  return apiKeys.find(k => k.key === key);
}

export function listApiKeys(): ApiKey[] {
  return apiKeys;
}
