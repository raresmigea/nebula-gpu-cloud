import { useState } from "react";
import { api } from "../api/client";

export default function Chat() {
  const [response, setResponse] = useState("");

  const send = async () => {
    const res = await api.post(
      "/v1/chat/completions",
      {
        model: "nebula-7b",
        messages: [{ role: "user", content: "Hello GPU" }]
      },
      {
        headers: {
          Authorization: "Bearer nebula_0a0945cd-f1b3-4408-899f-62c40fce5616"
        }
      }
    );

    setResponse(res.data.choices[0].message.content);
  };

  return (
    <div>
      <button onClick={send}>Run Inference</button>
      <p>{response}</p>
    </div>
  );
}
