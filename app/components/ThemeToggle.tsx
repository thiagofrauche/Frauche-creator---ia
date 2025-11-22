"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  function toggle() {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-xl border border-[var(--border)] px-3 py-2 hover:bg-brand.light/60 transition"
      aria-label="Alternar tema"
      title="Modo escuro/claro"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
