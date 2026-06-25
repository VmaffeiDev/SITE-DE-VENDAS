# App Nativo (Android/iOS) — SQU4TTRO MOTORS

Esse projeto agora está preparado para gerar um app nativo de verdade usando
**Capacitor**, reaproveitando 100% do site Next.js que já existe.

## Como funciona

O app **não** carrega o site empacotado dentro dele. Como o site usa rotas de
API, Server Actions e banco de dados (Prisma), ele precisa de um servidor
rodando — então o app abre a URL de produção (`consultordevendasvictormaffei.com`)
dentro de uma WebView nativa, sem a barra de endereço do navegador.

Vantagem: toda atualização feita no site (deploy no Vercel) aparece automaticamente
no app, sem precisar gerar uma nova versão pra loja.

> ⚠️ Esses comandos precisam ser rodados em um computador com Node.js instalado.
> Pra build do iOS, precisa ser um Mac com Xcode. Pra Android, precisa do Android Studio.
> Eu (Claude) não tenho acesso a internet nem ao Android Studio/Xcode no meu ambiente,
> então não consigo rodar esses comandos por você — mas todos os arquivos de
> configuração já estão prontos no projeto.

## Passo 1 — Instalar as dependências

```bash
npm install
```

(Isso já vai instalar os pacotes do Capacitor que adicionei no `package.json`.)

## Passo 2 — Inicializar as plataformas nativas

```bash
npx cap add android
npx cap add ios
```

Isso cria as pastas `android/` e `ios/` com os projetos nativos completos.

## Passo 3 — Ícone e splash screen

1. Crie um ícone quadrado 1024x1024px no tema preto e vermelho da marca
2. Salve como `resources/icon.png` e `resources/splash.png` (2732x2732px)
3. Gere todos os tamanhos automaticamente:

```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

## Passo 4 — Sincronizar e abrir nos editores nativos

```bash
npm run cap:sync
npm run cap:android   # abre no Android Studio
npm run cap:ios       # abre no Xcode (só funciona em Mac)
```

## Passo 5 — Testar no celular

- **Android**: conecte o celular via USB (modo desenvolvedor + depuração USB ativados) e clique em "Run" no Android Studio
- **iOS**: precisa de um Mac + conta Apple Developer ($99/ano) pra rodar num iPhone físico

## Passo 6 — Publicar nas lojas

| Loja | Custo | O que você precisa |
|---|---|---|
| Google Play | $25 (pagamento único) | Conta de desenvolvedor Google Play, gerar build assinado (.aab) no Android Studio |
| App Store | $99/ano | Conta Apple Developer, build via Xcode (Archive → Distribute) |

## ⚠️ Importante sobre aprovação na Apple

A Apple às vezes rejeita apps que são "só um site dentro de uma casca" (Guideline 4.2).
Pra reduzir esse risco, já deixei pronto:
- Status bar e splash screen nativos (não parece navegador)
- Estrutura pra adicionar notificações push, compartilhamento nativo, etc.

Se a Apple rejeitar na primeira tentativa, o próximo passo é adicionar pelo menos
um recurso 100% nativo (ex: notificações push avisando de veículo novo no estoque).
Posso te ajudar com isso quando chegar nessa etapa.

## Trocar o domínio que o app carrega

Se quiser usar `squ4ttromotors.com.br` em vez de `consultordevendasvictormaffei.com`,
edite uma linha em `capacitor.config.ts`:

```ts
server: {
  url: "https://squ4ttromotors.com.br",
  ...
}
```

Depois rode `npm run cap:sync` de novo.
