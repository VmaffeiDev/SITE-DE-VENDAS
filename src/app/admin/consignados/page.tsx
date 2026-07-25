import Image from "next/image";
import Link from "next/link";
import {
  BadgeDollarSign,
  CarFront,
  Check,
  CircleSlash,
  Eye,
  ShieldCheck
} from "lucide-react";

import {
  approveConsignment,
  convertConsignmentToVehicle,
  markConsignmentSold,
  refuseConsignment,
  updateConsignmentStatus
} from "@/app/admin/consignados/actions";
import { formatCurrency, formatMileage } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import {
  CONSIGNMENT_STATUSES,
  type ConsignmentImage,
  type ConsignmentStatus
} from "@/types/consignment";

export const dynamic = "force-dynamic";

const statusLabels: Record<ConsignmentStatus, string> = {
  pendente_avaliacao: "Pendente avaliação",
  aprovado: "Aprovado",
  recusado: "Recusado",
  anunciado: "Anunciado",
  vendido: "Vendido"
};

const statusBadgeClass: Record<ConsignmentStatus, string> = {
  pendente_avaliacao: "bg-amber-50 text-amber-800 border border-amber-200",
  aprovado: "bg-green-50 text-green-800 border border-green-200",
  recusado: "bg-red-50 text-red-800 border border-red-200",
  anunciado: "bg-blue-50 text-blue-800 border border-blue-200",
  vendido: "bg-mist text-graphite border border-line"
};

function parseImages(value: string): ConsignmentImage[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function getLeads() {
  try {
    return await prisma.consignmentLead.findMany({
      orderBy: { createdAt: "desc" },
      include: { vehicle: true }
    });
  } catch (error) {
    console.warn("Nao foi possivel carregar consignados:", error);
    return [];
  }
}

export default async function AdminConsignadosPage() {
  const leads = await getLeads();

  return (
    <section className="bg-mist py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-graphite">
              Admin
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-ink">
              Consignados recebidos
            </h1>
            <p className="mt-3 max-w-3xl leading-7 text-graphite">
              Acompanhe leads de consignação, aprove propostas, recuse, anuncie no
              estoque principal ou marque como vendido.
            </p>
          </div>
          <Link
            href="/consignar"
            className="inline-flex items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-black text-white"
          >
            <CarFront size={18} />
            Página pública
          </Link>
        </div>

        {leads.length ? (
          <div className="grid gap-5">
            {leads.map((lead) => {
              const status = CONSIGNMENT_STATUSES.includes(
                lead.status as ConsignmentStatus
              )
                ? (lead.status as ConsignmentStatus)
                : "pendente_avaliacao";
              const images = parseImages(lead.images);
              const vehicleLink = lead.vehicle?.id
                ? `/veiculo/${lead.vehicle.id}`
                : null;

              return (
                <article
                  key={lead.id}
                  className="grid gap-5 rounded border border-line bg-white p-5 shadow-sm lg:grid-cols-[1fr_280px]"
                >
                  <div>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-graphite">
                          Proprietário
                        </p>
                        <h2 className="mt-2 text-2xl font-black text-ink">
                          {lead.name}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-graphite">
                          {lead.phone} · {lead.email} · {lead.city}
                        </p>
                      </div>
                      <span className={`h-fit rounded px-3 py-2 text-xs font-black uppercase tracking-[0.14em] ${statusBadgeClass[status]}`}>
                        {statusLabels[status]}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-graphite">
                          Veículo
                        </p>
                        <p className="mt-2 font-black text-ink">
                          {[lead.brand, lead.model, lead.version].filter(Boolean).join(" ")}
                        </p>
                        <p className="mt-1 text-sm text-graphite">
                          Ano {lead.year ?? "não informado"} · {lead.color ?? "cor não informada"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-graphite">
                          Km
                        </p>
                        <p className="mt-2 font-black text-ink">
                          {formatMileage(lead.mileage)}
                        </p>
                        <p className="mt-1 text-sm text-graphite">
                          Placa {lead.plate ?? "não informada"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-graphite">
                          Valor pretendido
                        </p>
                        <p className="mt-2 font-black text-ink">
                          {formatCurrency(lead.askingPrice)}
                        </p>
                        <p className="mt-1 text-sm text-graphite">
                          Recebido em {lead.createdAt.toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    {lead.notes ? (
                      <p className="mt-5 rounded bg-mist p-4 text-sm leading-6 text-graphite">
                        {lead.notes}
                      </p>
                    ) : null}

                    <div className="mt-5 flex flex-wrap gap-2">
                      <form action={approveConsignment}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist">
                          <Check size={16} />
                          Aprovar consignação
                        </button>
                      </form>
                      <form action={refuseConsignment}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist">
                          <CircleSlash size={16} />
                          Recusar
                        </button>
                      </form>
                      <form action={convertConsignmentToVehicle}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button
                          disabled={status !== "aprovado" && status !== "anunciado"}
                          className="inline-flex items-center gap-2 rounded bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-graphite disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          <BadgeDollarSign size={16} />
                          Converter em anúncio do estoque
                        </button>
                      </form>
                      <form action={markConsignmentSold}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist">
                          <ShieldCheck size={16} />
                          Marcar como vendido
                        </button>
                      </form>
                      {vehicleLink ? (
                        <Link
                          href={vehicleLink}
                          className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-sm font-bold text-ink transition hover:bg-mist"
                        >
                          <Eye size={16} />
                          Ver anúncio
                        </Link>
                      ) : null}
                    </div>

                    <form
                      action={updateConsignmentStatus}
                      className="mt-4 flex max-w-sm items-end gap-2"
                    >
                      <input type="hidden" name="id" value={lead.id} />
                      <label className="grid flex-1 gap-2 text-sm font-bold text-ink">
                        Alterar status
                        <select
                          name="status"
                          defaultValue={status}
                          className="h-10 px-3 text-sm"
                        >
                          {CONSIGNMENT_STATUSES.map((item) => (
                            <option key={item} value={item}>
                              {statusLabels[item]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button className="h-10 rounded bg-mist px-3 text-sm font-bold text-ink">
                        Salvar
                      </button>
                    </form>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-graphite">
                      Fotos
                    </p>
                    {images.length ? (
                      <div className="max-h-96 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                          {images.map((image) => (
                            <div
                              key={image.src}
                              className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-mist"
                            >
                              <Image
                                src={image.src}
                                alt={image.label}
                                fill
                                sizes="160px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="rounded border border-dashed border-gray-300 bg-mist p-6 text-center text-sm text-graphite">
                        Nenhuma foto enviada.
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded border border-line bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-black text-ink">
              Nenhum veículo em consignação recebido
            </h2>
            <p className="mt-3 text-graphite">
              Os envios feitos pelo formulário aparecerão aqui com status pendente.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
