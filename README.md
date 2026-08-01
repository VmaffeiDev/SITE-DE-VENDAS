# VMAFFEI Motors

Site de vendas de veiculos em Next.js 15, TypeScript e Tailwind CSS, com estoque sincronizado automaticamente pelo XML do Revenda Mais.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

O comando `npm run dev` tambem executa `prisma db push` para criar o banco SQLite local usado pelos leads de consignacao.

## XML Revenda Mais

O estoque principal e carregado de:

```text
http://app.revendamais.com.br/application/index.php/apiGeneratorXml/generator/sitedaloja/4e24bb8b9bfec5a702ee95ca0d7b84987561.xml
```

As paginas publicas usam `revalidate = 300`, atualizando os dados a cada 5 minutos.

## Fotos dos anuncios

As URLs de fotos do feed passam por `src/lib/images.ts` antes de chegar aos
componentes: o protocolo relativo (`//host/foto.jpg`) e o host sem protocolo
ganham `https://`, `http://` e promovido para `https://` (evita bloqueio de
conteudo misto) e espacos/acentos sao percent-encoded.

Todo host que serve foto precisa estar em `images.remotePatterns`
(`next.config.ts`). Host fora da lista faz o otimizador do Next responder
`400 "url" parameter is not allowed` e o anuncio aparece sem imagem. Se o
Revenda Mais passar a servir de um dominio novo, adicione o host ali.

`VehicleImage` (`src/components/VehicleImage.tsx`) tenta o otimizador, cai para
a origem direta se ele falhar e so entao mostra o placeholder.

> Limitacao conhecida: as fotos de consignacao sao gravadas em
> `public/uploads/consignments` pelo `POST /api/consignments`. Em hospedagem
> serverless (Vercel) esse diretorio e efemero e nao sobrevive ao deploy, entao
> anuncios convertidos de consignacao ficam sem foto em producao. Resolver isso
> exige armazenamento externo (Vercel Blob, S3 ou equivalente).

## Variaveis de ambiente

Crie um `.env` a partir do `.env.example` se quiser alterar os valores padrao.

```bash
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_WHATSAPP_NUMBER="5541999866482"
ADMIN_USER="admin"
ADMIN_PASSWORD=""
```

Defina `ADMIN_PASSWORD` em produção para proteger as rotas `/admin/*`.

## Dominio e contato

- Site: `https://consultordevendasvictormaffei.com`
- Email: `atendimento@consultordevendasvictormaffei.com`

## Rotas principais

- `/`: home com carrossel de destaque, destaques e ultimos adicionados.
- `/estoque`: listagem com filtros por marca, modelo, ano, preco, km, combustivel e cambio.
- `/veiculo/[id]`: pagina detalhada do veiculo com galeria, ficha tecnica, descricao, opcionais e CTAs.
- `/consignar`: formulario completo para consignacao de veiculos.
- `/admin/consignados`: painel administrativo dos leads de consignacao.
