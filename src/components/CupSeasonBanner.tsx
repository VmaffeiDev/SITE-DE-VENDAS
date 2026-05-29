import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";

import { getWhatsAppLink } from "@/lib/contact";

const cupPlayers = [
  { letter: "S", x: "15%", y: "38%", className: "cup-player-green" },
  { letter: "Q", x: "28%", y: "64%", className: "cup-player-yellow" },
  { letter: "U", x: "41%", y: "36%", className: "cup-player-blue" },
  { letter: "4", x: "51%", y: "58%", className: "cup-player-white" },
  { letter: "T", x: "62%", y: "35%", className: "cup-player-green" },
  { letter: "T", x: "72%", y: "63%", className: "cup-player-yellow" },
  { letter: "R", x: "82%", y: "38%", className: "cup-player-blue" },
  { letter: "O", x: "91%", y: "56%", className: "cup-player-goal" },
];

const crowd = Array.from({ length: 28 }, (_, index) => index);
const confetti = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: `${(index % 16) * 0.16}s`,
  duration: `${2.8 + (index % 6) * 0.18}s`,
}));

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
          <div className="cup-confetti" aria-hidden>
            {confetti.map((piece) => (
              <span
                key={piece.id}
                className="cup-confetti-piece"
                style={
                  {
                    "--confetti-left": piece.left,
                    "--confetti-delay": piece.delay,
                    "--confetti-duration": piece.duration,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="cup-crowd cup-crowd-top" aria-hidden>
            {crowd.map((fan) => (
              <span
                key={`top-${fan}`}
                className="cup-fan"
                style={{ "--fan-delay": `${fan * 0.06}s` } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="cup-crowd cup-crowd-bottom" aria-hidden>
            {crowd.map((fan) => (
              <span
                key={`bottom-${fan}`}
                className="cup-fan"
                style={{ "--fan-delay": `${fan * 0.05}s` } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="cup-pitch-lines" aria-hidden />
          <div className="cup-goal cup-goal-left" aria-hidden />
          <div className="cup-goal cup-goal-right" aria-hidden />
          <div className="cup-scoreboard" aria-hidden>
            SQU4TTRO FC
          </div>
          <div className="cup-field-team" aria-hidden>
            {cupPlayers.map((player, index) => (
              <span
                key={`${player.letter}-${index}`}
                className={`cup-player-letter ${player.className ?? ""}`}
                style={
                  {
                    "--x": player.x,
                    "--y": player.y,
                    "--kick-delay": `${index * -0.72}s`,
                  } as React.CSSProperties
                }
              >
                {player.letter}
              </span>
            ))}
            <span className="cup-match-ball" aria-hidden />
          </div>
          <span className="sr-only">
            As letras da palavra Squ4ttro trocam passes dentro de um campo de
            futebol com traves e torcedores nas laterais.
          </span>
        </div>
      </div>
    </section>
  );
}
