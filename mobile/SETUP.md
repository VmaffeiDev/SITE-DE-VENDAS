# App VMAFFEI Motors — Expo / React Native

App nativo para iOS e Android que se conecta à API do site.

## Pré-requisitos

- Node.js 18+ instalado no seu computador
- npm ou yarn
- Conta no [Expo](https://expo.dev) (gratuita para desenvolvimento)
- Para iOS: Mac com Xcode instalado
- Para Android: Android Studio instalado

## Como rodar em desenvolvimento

```bash
# Entre na pasta mobile
cd mobile

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

Vai abrir o Expo Go no QR code — escaneie com o celular (iOS ou Android) para ver o app.

## Antes de publicar — configure o número de WhatsApp

Edite `lib/api.ts` e substitua o número:

```ts
const WHATSAPP_NUMBER = "5541999866482"; // já está correto (confirme!)
```

## Publicar nas lojas

### Instalar EAS (Expo Application Services)

```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Build Android (Google Play)

```bash
eas build --platform android --profile production
```

Custo: $25 (taxa única) para criar conta no Google Play Console.

### Build iOS (App Store)

```bash
eas build --platform ios --profile production
```

Custo: $99/ano para conta Apple Developer Program.

## Estrutura do app

```
mobile/
  app/
    _layout.tsx           → Layout raiz (StatusBar, SafeArea)
    (tabs)/
      _layout.tsx         → Barra de abas
      index.tsx           → Tela Início (veículos em destaque)
      estoque.tsx         → Tela Estoque (busca + lista completa)
      consignar.tsx       → Tela Consignação
    veiculo/
      [id].tsx            → Tela de detalhe do veículo
  components/
    VehicleCard.tsx       → Card de veículo reutilizável
  lib/
    api.ts                → Client da API do site
```

## API utilizada

O app consome as rotas do próprio site:

- `GET /api/vehicles` — lista completa do estoque
- `GET /api/vehicles/[id]` — detalhe de um veículo

Ambas com cache de 5 minutos e headers CORS abertos.
