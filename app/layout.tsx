import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA Creator",
  description: "Plataforma para criar projetos com IA",
};

// Evita 'flash' de tema e mantém o dark/light do localStorage
const themeInit = `
try {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}
