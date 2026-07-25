import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VMAFFEI Motors — Veículos selecionados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#111118",
          fontFamily: "system-ui, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            background: "#222230",
            borderRadius: 12,
            marginBottom: 24
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "white",
              letterSpacing: -1
            }}
          >
            VM
          </span>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            letterSpacing: -2,
            marginBottom: 12
          }}
        >
          VMAFFEI MOTORS
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 4
          }}
        >
          CURITIBA, PR · VEÍCULOS SELECIONADOS
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
