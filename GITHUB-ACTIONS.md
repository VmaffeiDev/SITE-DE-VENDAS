# Build automático via GitHub Actions

Criei dois workflows em `.github/workflows/`. Eles rodam automaticamente
toda vez que você (ou o Codex) fizer um push pra branch `main` — sem precisar
de mim, de Mac, ou de Android Studio/Xcode instalado em lugar nenhum.

## O que já funciona hoje, sem configurar nada

| Workflow | O que faz | Resultado |
|---|---|---|
| `build-android.yml` | Compila um APK de debug | Arquivo `.apk` pra instalar e testar no celular Android |
| `build-ios.yml` | Compila o projeto pra simulador iOS | Só confirma que não tem erro de build — **não gera arquivo instalável** |

### Como baixar o APK gerado

1. Vá na aba **Actions** do repositório no GitHub
2. Clique na execução mais recente de "Build Android App"
3. Role até "Artifacts" e baixe `SQU4TTRO-MOTORS-debug-apk`
4. Transfere pro celular Android e instala (pode precisar permitir "fontes desconhecidas")

## Pra publicar de verdade nas lojas, falta configurar:

### Google Play (mais simples)

1. Gere um keystore (uma vez só, guarde pra sempre):
   ```bash
   keytool -genkey -v -keystore release.keystore -alias squ4ttro -keyalg RSA -keysize 2048 -validity 10000
   ```
2. No GitHub: **Settings → Secrets and variables → Actions**, crie:
   - Secret `ANDROID_KEYSTORE_BASE64` → rode `base64 -i release.keystore` e cole o resultado
   - Secret `ANDROID_KEYSTORE_PASSWORD`
   - Secret `ANDROID_KEY_ALIAS` → `squ4ttro` (ou o que você escolheu)
   - Secret `ANDROID_KEY_PASSWORD`
3. Em **Settings → Secrets and variables → Actions → Variables**, crie a variável `ANDROID_SIGNING_READY` com valor `true`
4. No próximo push, o workflow vai gerar também um `.aab` assinado, pronto pra subir no Google Play Console

### App Store (mais trabalhoso — precisa de conta Apple Developer ativa)

1. No site developer.apple.com, gere um **Certificado de distribuição** (.p12) e um **Provisioning Profile** pro app
2. No GitHub, crie os secrets:
   - `IOS_CERTIFICATE_BASE64` (o .p12 em base64)
   - `IOS_CERTIFICATE_PASSWORD`
   - `IOS_PROVISION_PROFILE_BASE64` (o .mobileprovision em base64)
   - `IOS_TEAM_ID` (encontrado no Apple Developer Portal)
3. Crie a variável `IOS_SIGNING_READY` com valor `true`
4. No próximo push, o workflow gera um `.ipa` assinado, pronto pra subir no App Store Connect (via Transporter ou `xcrun altool`)

Isso ainda exige que você tenha a conta Apple Developer ($99/ano) ativa primeiro —
sem isso não tem certificado pra gerar. Quando chegar nessa etapa, te ajudo a
gerar o certificado e o provisioning profile passo a passo.
