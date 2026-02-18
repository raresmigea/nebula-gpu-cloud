import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Dashboard() {
  const [keys, setKeys] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [modelName, setModelName] = useState("");

  const loadKeys = () => api.get("/apikeys").then(res => setKeys(res.data));
  const loadMetrics = () => api.get("/metrics").then(res => setMetrics(res.data));
  const loadModels = () => api.get("/models").then(res => setModels(res.data));

  const createKey = async () => {
    await api.post("/apikeys");
    loadKeys();
  };

  const deployModel = async () => {
    if (!modelName) return;
    await api.post("/models", { name: modelName });
    setModelName("");
    loadModels();
  };

  useEffect(() => {
    loadKeys();
    loadMetrics();
    loadModels();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Nebula GPU Dashboard</h1>

      <section>
        <h2>API Keys</h2>
        <button onClick={createKey}>Create Key</button>
        <ul>
          {keys.map(k => <li key={k.id}>{k.key}</li>)}
        </ul>
      </section>

      <section>
        <h2>Usage Metrics</h2>
        <ul>
          {metrics.map(m => (
            <li key={m.apiKey}>
              {m.apiKey} — Requests: {m.requests}, Last Used: {m.lastUsed ? new Date(m.lastUsed).toLocaleString() : "never"}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Deployed Models</h2>
        <input
          value={modelName}
          placeholder="Model name"
          onChange={e => setModelName(e.target.value)}
        />
        <button onClick={deployModel}>Deploy Model</button>
        <ul>
          {models.map(m => (
            <li key={m.name}>{m.name} — Deployed at: {new Date(m.deployedAt).toLocaleString()}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
