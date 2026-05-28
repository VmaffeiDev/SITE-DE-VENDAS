import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        graphite: "#2f343b",
        line: "#e5e7eb",
        mist: "#f5f6f8",
        whatsapp: "#25d366"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)",
        premium:
          "0 24px 70px rgba(15, 23, 42, 0.14), 0 8px 22px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
