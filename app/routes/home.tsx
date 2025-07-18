import type { Route } from "./+types/home";
import { useState } from "react";
import { NewsCard } from "../components/NewsCard";
import { IconButton } from "../components/IconButton";
import { LoginModal } from "../components/LoginModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "A11y Workshop" },
    { name: "description", content: "Demo of common accessibility issues" },
  ];
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="p-4 space-y-4">
      <NewsCard />
      <IconButton onClick={() => setOpen(true)} />
      {open && <LoginModal onClose={() => setOpen(false)} />}
    </main>
  );
}
