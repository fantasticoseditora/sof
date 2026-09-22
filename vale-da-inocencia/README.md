# O Vale da Inocência — landing page

Landing mobile-first de captação para a leitura gratuita de **O Vale da Inocência — A História Esquecida dos Norús**.

## URL pública

`https://fantasticoseditora.github.io/sof/vale-da-inocencia/`

URL do QR Code com rastreamento:

`https://fantasticoseditora.github.io/sof/vale-da-inocencia/?utm_source=cartaz&utm_medium=qrcode&utm_campaign=vale-da-inocencia`

## Arquivos

- `index.html`: estrutura semântica da landing.
- `styles.css`: identidade visual e responsividade.
- `app.js`: validação, UTMs, envio e liberação pós-cadastro.
- `config.js`: endpoint e links do PDF/ePub.
- `apps-script.gs`: endpoint para registrar leads na Google Sheet privada.
- `assets/hero-vale-da-inocencia.webp`: hero principal.
- `assets/hero-vale-da-inocencia.jpg`: fallback do hero.
- `assets/qr-code-vale-da-inocencia.png`: QR Code em PNG.
- `assets/qr-code-vale-da-inocencia.svg`: QR Code vetorial para impressão.

## Fluxo

QR Code → landing → nome + e-mail + WhatsApp → Google Sheet privada → liberação de PDF/ePub.

## Conexões finais

1. Abra a planilha **Leads — O Vale da Inocência**.
2. Crie um projeto em `script.google.com` e cole `apps-script.gs`.
3. Execute `setupSheet` uma vez para autorizar a conexão com a planilha.
4. Implante como **App da Web**, executando como o proprietário e permitindo acesso a qualquer pessoa.
5. Cole a URL terminada em `/exec` no campo `endpoint` de `config.js`.
6. Insira em `config.js` as URLs finais de `pdfUrl` e `epubUrl`.
7. Faça um cadastro de teste e confirme uma nova linha na aba `Leads`.

## Dados registrados

Data/hora, nome, e-mail, WhatsApp, obra, origem, campanha, UTMs, referrer, URL da landing e consentimentos separados para acesso e marketing.

Nenhum lead é gravado no GitHub; o repositório contém apenas a interface pública e o código do endpoint.
