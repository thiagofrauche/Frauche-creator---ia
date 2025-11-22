import "./globals.css";

export const metadata = {
  title: "IA Creator App",
  description: "Criação de projetos com IA — barra central + menu à direita + dark mode",
};

const themeInit = `
try{ if(localStorage.getItem('theme')==='dark'){ document.documentElement.classList.add('dark'); } }catch(e){}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
