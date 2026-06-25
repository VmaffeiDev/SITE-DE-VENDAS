import type { CapacitorConfig } from "@capacitor/cli";

/**
 * SQU4TTRO MOTORS / VMAFFEI Motors — App nativo (Capacitor)
 *
 * Esse app NÃO empacota o site dentro dele. Como o site usa rotas de API,
 * Server Actions e banco de dados (Prisma), ele precisa de um servidor rodando.
 * Por isso o app carrega a URL de produção dentro de uma WebView nativa.
 *
 * Vantagem: qualquer atualização feita no site (Vercel) aparece automaticamente
 * no app, sem precisar gerar uma nova versão pra loja.
 */
const config: CapacitorConfig = {
  appId: "br.com.squ4ttromotors.app",
  appName: "SQU4TTRO MOTORS",
  webDir: "public",
  server: {
    // Troque para "https://squ4ttromotors.com.br" se preferir esse domínio.
    url: "https://consultordevendasvictormaffei.com",
    androidScheme: "https",
    cleartext: false,
  },
  android: {
    backgroundColor: "#0a0a0a",
  },
  ios: {
    backgroundColor: "#0a0a0a",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: "#0a0a0a",
      androidSplashResourceName: "splash",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0a0a0a",
    },
  },
};

export default config;
