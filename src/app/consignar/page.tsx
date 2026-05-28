import type { Metadata } from "next";
import {
  BadgeCheck,
  Camera,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Handshake,
  MessageCircle,
  Megaphone,
  ShieldCheck
} from "lucide-react";

import { getWhatsAppLink } from "@/lib/contact";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Consignar veículo | VMAFFEI Motors",
  description:
    "Venda seu carro em consignação com a VMAFFEI Motors. Avaliação, divulgação, atendimento aos interessados e suporte até a transferência."
};

const benefits = [
  "Avaliação profissional do veículo",
  "Divulgação no site e redes sociais",
  "Atendimento aos interessados feito pela loja",
  "Intermediação segura",
  "Mais visibilidade para vender mais rápido",
  "Suporte completo até a transferência"
];

const steps = [
  {
    title: "Envie os dados",
    description: "Preencha as informações e anexe fotos reais do veículo.",
    icon: ClipboardCheck
  },
  {
    title: "Avaliação da loja",
    description: "A equipe analisa condição, mercado e estratégia de venda.",
    icon: CarFront
  },
  {
    title: "Divulgação ativa",
    description: "O carro pode entrar no site, redes sociais e atendimento da loja.",
    icon: Megaphone
  },
  {
    title: "Venda acompanhada",
    description: "Negociação e documentação recebem suporte até a transferência.",
    icon: ShieldCheck
  }
];

const uploadFields = [
  { name: "frontImages", label: "Foto frontal" },
  { name: "rearImages", label: "Traseira" },
  { name: "sideImages", label: "Lateral" },
  { name: "interiorImages", label: "Interior" },
  { name: "dashboardImages", label: "Painel" }
];

const faq = [
  {
    question: "Como funciona a consignação?",
    answer:
      "Você envia os dados do veículo, a loja avalia as informações e, após aprovação, cuidamos da divulgação, atendimento aos interessados e negociação."
  },
  {
    question: "Qual a comissão da loja?",
    answer:
      "A comissão é combinada após a avaliação do veículo, considerando valor pretendido, estado geral e estratégia de venda."
  },
  {
    question: "Quanto tempo leva para vender?",
    answer:
      "O prazo varia conforme modelo, preço, condição do veículo e demanda do mercado. A VMAFFEI Motors trabalha para aumentar a exposição e acelerar a venda."
  },
  {
    question: "Quem cuida da documentação?",
    answer:
      "A loja acompanha a negociação e orienta as etapas até a transferência, buscando uma intermediação segura para comprador e proprietário."
  }
];

function inputClass() {
  return "h-12 px-3 text-sm";
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ConsignarPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const sent = single(params.enviado) === "1";
  const error = single(params.erro);

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded bg-mist px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-graphite">
              <Handshake size={16} />
              Consignação
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Venda seu carro com a VMAFFEI Motors
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-graphite">
              Deixe seu veículo em consignação conosco e nós cuidamos de todo o
              processo de venda.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 rounded border border-line bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 text-ink" size={20} />
                  <span className="text-sm font-semibold leading-6 text-graphite">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={getWhatsAppLink(
                "Olá, quero falar com a loja sobre consignação."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded bg-whatsapp px-5 py-3 text-sm font-black text-white transition hover:brightness-95"
            >
              <MessageCircle size={18} />
              Quero falar com a loja sobre consignação
            </a>
          </div>

          <div className="grid content-start gap-4 rounded border border-line bg-mist p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded bg-ink text-white">
                <ShieldCheck size={23} />
              </span>
              <div>
                <p className="font-black text-ink">Intermediação segura</p>
                <p className="text-sm text-graphite">
                  Recebemos seu cadastro e retornamos com a avaliação.
                </p>
              </div>
            </div>
            <div className="grid gap-3 border-t border-line pt-4 text-sm text-graphite">
              <p className="flex items-center gap-2">
                <BadgeCheck size={18} />
                Status inicial: pendente de avaliação
              </p>
              <p className="flex items-center gap-2">
                <Camera size={18} />
                Envie várias fotos do veículo
              </p>
              <p className="flex items-center gap-2">
                <FileText size={18} />
                Dados salvos para análise administrativa
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
            Como funciona
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded bg-ink text-white">
                      <Icon size={21} />
                    </span>
                    <span className="text-sm font-black text-graphite">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 text-lg font-black text-ink">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-graphite">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <form
            action="/api/consignments"
            method="post"
            encType="multipart/form-data"
            className="rounded border border-line bg-white p-5 shadow-soft sm:p-8"
          >
            <div className="mb-7">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
                Formulário
              </p>
              <h2 className="mt-2 text-3xl font-black text-ink">
                Dados para avaliação
              </h2>
              {sent ? (
                <p className="mt-4 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
                  Recebemos seu cadastro. A loja entrará em contato para seguir
                  com a avaliação.
                </p>
              ) : null}
              {error ? (
                <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                  Não foi possível enviar agora. Confira os campos obrigatórios e
                  tente novamente.
                </p>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Nome completo
                <input name="name" required className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Telefone
                <input name="phone" required className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Email
                <input name="email" type="email" required className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Cidade
                <input name="city" required className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Marca do veículo
                <input name="brand" required className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Modelo
                <input name="model" required className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Versão
                <input name="version" className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Ano
                <input name="year" inputMode="numeric" className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Quilometragem
                <input name="mileage" inputMode="numeric" className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Placa
                <input name="plate" className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Cor
                <input name="color" className={inputClass()} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-ink">
                Valor pretendido
                <input name="askingPrice" inputMode="decimal" className={inputClass()} />
              </label>
            </div>

            <label className="mt-5 grid gap-2 text-sm font-bold text-ink">
              Observações
              <textarea
                name="notes"
                rows={5}
                className="resize-y px-3 py-3 text-sm"
                placeholder="Informe detalhes de conservação, histórico, documentação ou pontos importantes."
              />
            </label>

            <div className="mt-8">
              <p className="text-lg font-black text-ink">Fotos do veículo</p>
              <p className="mt-1 text-sm text-graphite">
                Você pode enviar múltiplas imagens em cada campo.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {uploadFields.map((field) => (
                  <label
                    key={field.name}
                    className="grid gap-2 rounded border border-dashed border-gray-300 bg-mist p-4 text-sm font-bold text-ink"
                  >
                    {field.label}
                    <input
                      name={field.name}
                      type="file"
                      accept="image/*"
                      multiple
                      className="border-0 bg-transparent p-0 text-sm"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button className="mt-8 w-full rounded bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-graphite sm:w-auto">
              Enviar para avaliação
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-black text-ink">Dúvidas frequentes</h2>
          <div className="mt-6 divide-y divide-line rounded border border-line bg-white">
            {faq.map((item) => (
              <details key={item.question} className="group p-5">
                <summary className="cursor-pointer list-none text-lg font-black text-ink">
                  {item.question}
                </summary>
                <p className="mt-3 leading-7 text-graphite">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
