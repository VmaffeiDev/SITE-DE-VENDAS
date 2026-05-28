import { ArrowRight, MessageCircle, Quote, ShieldCheck, Star } from "lucide-react";

import { getWhatsAppLink } from "@/lib/contact";

const reviews = [
  {
    author: "adriano33 saqueto",
    text: "Ótimo atendimento, vendedor prestativo. Boa negociação, e o carro atendeu minhas necessidades. Parabéns pela loja e pelo vendedor Victor."
  },
  {
    author: "Isaque Prado",
    text: "Foi muito bom a negociação. Victor Maffei foi super atencioso desde o primeiro contato até a entrega do carro em Paranaguá. Super recomendo."
  },
  {
    author: "alberto luis koch koch",
    text: "Fiz duas compras de dois carros com Vitor Maffei e fui muito bem atendido. O melhor vendedor da loja."
  },
  {
    author: "Joelma Lara",
    text: "Atendimento excelente, um exemplo de respeito e consideração com o cliente. Fui excepcionalmente atendida pelo vendedor Vitor."
  },
  {
    author: "Jhony Branco",
    text: "Nunca fui tão bem atendido. Pagaram super bem no meu usado e comprei dois automóveis com eles. Gratidão ao vendedor Vitor, cara nota 10."
  },
  {
    author: "viviane alves de lima",
    text: "Ótimo atendimento com Victor Maffei. Nos ajudou muito, foi ágil nas negociações e acompanhou tudo até o test drive e o checklist."
  },
  {
    author: "Jaci Passos",
    text: "Ótima avaliação do meu carro. Victor foi muito paciente e prestativo. Indico de olhos fechados."
  },
  {
    author: "Caroline Corrêa Koch",
    text: "Eu e minha família amamos o atendimento e a qualidade dos veículos. O vendedor Victor foi muito atencioso."
  },
  {
    author: "andreza beck correa koch",
    text: "Victor Maffei foi super prestativo, nos atendeu muito bem, e tudo que precisou deu suporte."
  },
  {
    author: "suelen bidoia",
    text: "Loja com carros de boa qualidade e atendimento de excelência. Esclareceu todas as dúvidas, sempre pronto a responder."
  },
  {
    author: "voce com vi e fe",
    text: "Feliz com a minha compra. Atendimento do Vitor impecável, muito educado, atencioso e profissional."
  }
];

const featuredReviews = [reviews[1], reviews[4], reviews[6]];

function RatingStars() {
  return (
    <span className="flex items-center gap-0.5 text-[#f5b301]" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={16} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function GoogleReviews() {
  return (
    <section className="overflow-hidden border-y border-line bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded bg-ink px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-white">
              <ShieldCheck size={15} />
              Prova real
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-ink sm:text-5xl">
              Clientes que compraram, indicam e voltam.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-graphite">
              Avaliações recebidas no Google reforçam o atendimento próximo, a
              negociação transparente e o cuidado até a entrega do veículo.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-xl border border-line bg-mist shadow-soft sm:grid-cols-3">
            <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
              <p className="text-4xl font-black tracking-tight text-ink">5.0</p>
              <div className="mt-2">
                <RatingStars />
              </div>
              <p className="mt-2 text-sm font-semibold text-graphite">
                avaliações 5 estrelas
              </p>
            </div>
            <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
              <p className="text-4xl font-black tracking-tight text-ink">11</p>
              <p className="mt-2 text-sm font-semibold text-graphite">
                depoimentos reunidos
              </p>
            </div>
            <div className="p-5">
              <p className="text-4xl font-black tracking-tight text-ink">100%</p>
              <p className="mt-2 text-sm font-semibold text-graphite">
                atendimento citado
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {featuredReviews.map((review) => (
            <article
              key={review.author}
              className="rounded-xl border border-line bg-white p-5 shadow-soft"
            >
              <div className="flex items-center justify-between gap-4">
                <RatingStars />
                <Quote size={24} className="text-line" />
              </div>
              <p className="mt-5 min-h-28 text-base leading-7 text-graphite">
                “{review.text}”
              </p>
              <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-ink">
                {review.author}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-ink p-4 shadow-premium sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">
                Prints reais
              </p>
              <p className="mt-1 font-black text-white">Depoimentos do Google</p>
            </div>
            <a
              href={getWhatsAppLink("Olá, vi as avaliações da VMAFFEI Motors e quero atendimento.")}
              target="_blank"
              rel="noreferrer"
              className="hidden h-11 items-center justify-center gap-2 rounded bg-whatsapp px-4 text-sm font-black text-white transition hover:brightness-95 sm:inline-flex"
            >
              <MessageCircle size={18} />
              Quero atendimento
            </a>
          </div>

          <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-2">
            {reviews.map((review) => (
              <article
                key={review.author}
                className="w-[290px] shrink-0 snap-start rounded-lg border border-white/10 bg-[#2f343b] p-4 text-white shadow-soft sm:w-[360px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-whatsapp text-sm font-black uppercase text-white">
                      {review.author.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">{review.author}</p>
                      <p className="text-xs text-white/50">avaliação no Google</p>
                    </div>
                  </div>
                  <Quote size={20} className="shrink-0 text-white/25" />
                </div>
                <div className="mt-4">
                  <RatingStars />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/78">{review.text}</p>
              </article>
            ))}
          </div>

          <a
            href={getWhatsAppLink("Olá, vi as avaliações da VMAFFEI Motors e quero atendimento.")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-whatsapp px-5 text-sm font-black text-white transition hover:brightness-95 sm:hidden"
          >
            Quero atendimento
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
