import { useState } from "react";
import Modal from "./Modal";

export default function LoginModal({ onLogin, onClose }: { onLogin: (u: string, p: string) => void; onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <h2>Login</h2>
        {/* inputs lack labels */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={`border p-2 w-full ${error ? "border-red-500" : ""}`}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`border p-2 w-full ${error ? "border-red-500" : ""}`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="bg-blue-600 text-white px-4 py-2"
          onClick={() => {
            if (!username || !password) {
              setError("Required");
              return;
            }
            onLogin(username, password);
          }}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
}
