import { ApiKey } from "../services/apiKey.service";

declare global {
  namespace Express {
    interface Request {
      apiKey?: ApiKey;
    }
  }
}
