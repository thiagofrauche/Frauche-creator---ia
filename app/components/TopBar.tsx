"use client";
import SearchBar from "./SearchBar";
import RightMenu from "./RightMenu";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur bg-[var(--bg)]/90">
      {/* Grid com 3 colunas: esquerda | centro | direita */}
      <div className="mx-auto max-w-6xl grid grid-cols-[1fr_minmax(260px,640px)_1fr] items-center gap-3 px-4 py-3">
        {/* Esquerda: logo/título */}
        <div className="justify-self-start font-extrabold text-[var(--fg)]">IA Creator</div>

        {/* Centro: SEMPRE centralizado */}
        <div className="justify-self-center w-full">
          <SearchBar />
        </div>

        {/* Direita: tema + menu, alinhado à direita */}
        <div className="justify-self-end flex items-center gap-2">
          <ThemeToggle />
          <RightMenu />
        </div>
      </div>
    </header>
  );
}
