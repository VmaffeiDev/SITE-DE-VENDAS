"use client";

import { useEffect } from "react";

/**
 * Roda só dentro do app nativo (Android/iOS via Capacitor).
 * No site normal (navegador), Capacitor.isNativePlatform() retorna false
 * e esse componente não faz nada — sem risco pro site web.
 */
export function NativeBridge() {
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { Capacitor } = await import("@capacitor/core");
        if (!Capacitor.isNativePlatform() || !active) return;

        const [{ StatusBar, Style }, { SplashScreen }] = await Promise.all([
          import("@capacitor/status-bar"),
          import("@capacitor/splash-screen")
        ]);

        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: "#0a0a0a" });
        await SplashScreen.hide();
      } catch {
        // Rodando no navegador normal — ignora silenciosamente.
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return null;
}
