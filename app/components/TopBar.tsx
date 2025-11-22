"use client";
import SearchBar from "./SearchBar";
import RightMenu from "./RightMenu";
import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur bg-[var(--bg)]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="font-extrabold text-[var(--fg)]">IA Creator</div>
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <RightMenu />
        </div>
      </div>
    </header>
  );
}
