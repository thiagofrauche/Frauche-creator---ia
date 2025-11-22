import TopBar from "../components/TopBar";

export default function Projects() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-6xl px-4">
        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-xl font-semibold">Seus projetos</h2>
          <p className="text-[var(--muted)]">Você ainda não tem projetos.</p>
        </section>
      </main>
    </>
  );
}
