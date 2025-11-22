import TopBar from "../components/TopBar";

export default function Settings() {
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-6xl px-4">
        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6">
          <h2 className="text-xl font-semibold">Configurações</h2>
          <ul className="mt-3 space-y-2">
            <li>• Sair da conta</li>
            <li>• Informações de pagamento</li>
            <li>• Meu plano</li>
            <li>• Editar perfil (nome, e-mail, telefone, foto)</li>
          </ul>
        </section>
      </main>
    </>
  );
}
