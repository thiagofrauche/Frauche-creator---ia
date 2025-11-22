import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#e6f2ff",   // azul claro (fundo suave)
          primary: "#1d4ed8"  // azul para botões/realces
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.08)"
      }
    }
  },
  plugins: [],
} satisfies Config;
