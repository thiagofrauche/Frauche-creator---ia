import TopBar from "./components/TopBar";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-6xl px-4">
        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h1 className="text-2xl font-bold">Comece um projeto com IA</h1>
          <p className="text-[var(--muted)]">
            Use a barra acima para pedir o que você quer criar. Tudo acontece aqui dentro.
          </p>
        </section>
      </main>
    </>
  );
}
