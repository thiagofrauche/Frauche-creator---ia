"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RightMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl border border-[var(--border)] px-3 py-2 hover:bg-brand.light/60 transition"
        aria-label="Abrir menu"
        title="Menu"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-soft p-2">
          <Link className="block px-3 py-2 rounded-xl hover:bg-brand.light" href="/new">Novo projeto</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-brand.light" href="/projects">Seus projetos</Link>
          <Link className="block px-3 py-2 rounded-xl hover:bg-brand.light" href="/settings">Configurações</Link>
        </div>
      )}
    </div>
  );
}
