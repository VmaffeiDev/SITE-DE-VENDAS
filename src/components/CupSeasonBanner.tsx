import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";

import { getWhatsAppLink } from "@/lib/contact";

export function CupSeasonBanner() {
  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-white/70 bg-ink text-white shadow-premium">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/75">
            <Trophy size={15} />
            Clima de Copa
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Escolha seu carro para torcer, viajar e comemorar.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Atendimento em ritmo de jogo: estoque atualizado, WhatsApp direto e
            consultoria para encontrar o veículo certo antes da próxima partida.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/estoque"
              className="inline-flex h-12 items-center justify-center gap-2 rounded bg-[#ffdf00] px-5 text-sm font-black text-ink transition hover:brightness-95"
            >
              Ver estoque
              <ArrowRight size={18} />
            </Link>
            <a
              href={getWhatsAppLink(
                "Olá, quero atendimento em clima de Copa para escolher um veículo."
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/20 bg-white/10 px-5 text-sm font-black text-white transition hover:bg-white/15"
            >
              Falar com Victor
              <Sparkles size={17} />
            </a>
          </div>
        </div>

        <div className="cup-logo-stage" aria-label="Animação da Squ4ttro em clima de Copa">
          <div className="cup-pitch-lines" aria-hidden />
          <div className="cup-scoreboard" aria-hidden>
            SQU4TTRO FC
          </div>
          <div className="cup-field-team" aria-hidden>
            {["S", "Q", "U", "4", "T", "T", "R", "O"].map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={`cup-player-letter ${
                  letter === "4" ? "cup-player-four" : ""
                } ${letter === "O" && index === 7 ? "cup-player-goal" : ""}`}
                style={{ "--delay": `${index * 0.16}s` } as React.CSSProperties}
              >
                {letter}
              </span>
            ))}
          </div>
          <span className="cup-match-ball" aria-hidden />
          <span className="sr-only">
            As letras da palavra Squ4ttro jogam uma partida de futebol no campo.
          </span>
        </div>
      </div>
    </section>
  );
}
