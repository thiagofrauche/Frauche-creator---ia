"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Carrega o tema salvo
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  // Troca o tema
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)]"
      title="Mudar tema"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
