import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import ApiKeys from "./pages/ApiKeys";

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: 10 }}>Dashboard</Link>
        <Link to="/chat" style={{ marginRight: 10 }}>Chat</Link>
        <Link to="/apikeys">API Keys</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/apikeys" element={<ApiKeys />} />
      </Routes>
    </Router>
  );
}

export default App;
