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
