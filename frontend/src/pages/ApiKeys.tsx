import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function ApiKeys() {
  const [keys, setKeys] = useState<any[]>([]);

  const load = () =>
    api.get("/apikeys").then(res => setKeys(res.data));

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await api.post("/apikeys");
    load();
  };

  return (
    <div>
      <h2>API Keys</h2>
      <button onClick={create}>Create Key</button>
      <ul>
        {keys.map(k => (
          <li key={k.id}>{k.key}</li>
        ))}
      </ul>
    </div>
  );
}
