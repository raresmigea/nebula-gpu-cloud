# Nebula GPU Cloud (Mini AI PaaS)

A simplified GPU cloud service platform demonstrating API key management, distributed task queues, model deployment, and inference capabilities.

---

## 🚀 Features

- API key creation and management
- Rate-limited inference requests
- OpenAI-compatible `/v1/chat/completions` endpoint (streaming & non-streaming)
- Simulated GPU workers with BullMQ task queue
- Usage telemetry and metrics dashboard
- Model deployment simulation
- Frontend dashboard for keys, models, metrics, and chat testing

---

## 🛠️ Tech Stack

- **Backend**: Node.js, TypeScript, Express, BullMQ, Redis  
- **Frontend**: React, Vite, Axios, React Router  
- **Redis**: Job queue, rate limiting, usage tracking  
- **Workers**: Simulated GPU inference with BullMQ

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js >= 18  
- npm or yarn  
- Redis (local or Docker)  
- Optional: Docker & Docker Compose for full stack setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure REDIS_HOST/PORT if needed
npm run dev
```

Runs on http://localhost:4000
Worker automatically runs with the backend

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Frontend Usage

Open http://localhost:5173

Dashboard: View service health and usage metrics

API Keys: Create and view API keys

Chat: Select a model and API key, then run inference

Models: Deploy new models or view deployed models

| Endpoint                     | Method | Description                          |
|-------------------------------|--------|--------------------------------------|
| /apikeys                      | GET    | List API keys                        |
| /apikeys                      | POST   | Create a new API key                  |
| /v1/chat/completions           | POST   | Send inference request (streaming/non-streaming) |
| /metrics                       | GET    | API usage metrics per key             |
| /models                        | GET    | List deployed models                  |
| /models                        | POST   | Deploy a new model                    |
| /health                        | GET    | Health check & uptime                 |



Example Chat Request:

```bash
curl -X POST http://localhost:4000/v1/chat/completions \
-H "Authorization: Bearer <YOUR_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "model": "nebula-7b",
  "messages": [{"role": "user", "content": "Hello GPU"}],
  "stream": false
}'
```

#### Important: Replace <YOUR_KEY> with a valid API key from /apikeys.

### Metrics & Rate Limiting

- Rate limiting: Each API key has a default of 10 requests per minute.
- Usage metrics are available in the frontend Dashboard and via the /metrics endpoint.
- Headers returned on rate-limited endpoints:
    X-RateLimit-Limit
    X-RateLimit-Remaining
    X-RateLimit-Reset

### Architecture Overview

- Backend: Express API, BullMQ for distributed task queue, Redis for state & telemetry
- Workers: Simulated GPU processing with asynchronous delays
- Frontend: React SPA managing API keys, deployed models, chat interface, and metrics
- Distributed Architecture: Multiple workers can pick jobs from Redis queue; can scale horizontally
