import TopBar from "../components/TopBar";

export default function NewProject() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-6xl px-4">
        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-xl font-semibold">Novo projeto</h2>
          <p className="text-[var(--muted)]">Assistente de criação (em breve).</p>
        </section>
      </main>
    </>
  );
}
