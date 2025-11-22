"use client";
import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    // Aqui você conectará às IAs específicas sem sair do app (futuras /api/*)
    alert("Você pediu: " + q);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-[620px]">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="flex-1 rounded-l-2xl border border-[var(--border)] bg-white dark:bg-[var(--panel)] px-4 py-2 outline-none"
        placeholder="Peça aqui o que quer criar…"
      />
      <button
        type="submit"
        className="rounded-r-2xl bg-brand.primary text-white px-4 py-2 hover:opacity-90"
      >
        Ir
      </button>
    </form>
  );
}
