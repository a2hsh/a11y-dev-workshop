import { useNavigate } from "react-router";
import { login } from "../auth";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

export default function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLogin = (u: string, p: string) => {
    if (login(u, p)) {
      navigate("/");
    } else {
      // simple visual error: nothing else
    }
  };

  return (
    <div className="p-4">
      {open && <LoginModal onLogin={handleLogin} onClose={() => setOpen(false)} />}
    </div>
  );
}
