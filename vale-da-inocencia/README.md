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

## Integração de leads

- Planilha privada: **Leads — O Vale da Inocência**.
- Endpoint do Google Apps Script implantado como **App da Web**.
- Execução: proprietário da planilha.
- Acesso: qualquer pessoa pode enviar; os leads não ficam públicos.
- A URL `/exec` está configurada em `config.js`.

## Conexão restante

Insira em `config.js` as URLs finais de `pdfUrl` e `epubUrl` antes do início da campanha.

## Dados registrados

Data/hora, nome, e-mail, WhatsApp, obra, origem, campanha, UTMs, referrer, URL da landing e consentimentos separados para acesso e marketing.

Nenhum lead é gravado no GitHub; o repositório contém apenas a interface pública e o código do endpoint.
