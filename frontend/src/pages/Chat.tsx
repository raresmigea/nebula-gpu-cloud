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
          Authorization: "Bearer nebula_df2c4236-05c7-4fdf-914a-dc789f66c16a"
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
