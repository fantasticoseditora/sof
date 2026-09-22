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
- `config-live.js`: cópia de referência da configuração.
- `apps-script.gs`: endpoint para registrar leads na Google Sheet privada.
- `assets/hero-vale-da-inocencia-cartaz.webp`: hero principal inspirado na linguagem ilustrada do cartaz.
- `assets/hero-vale-da-inocencia-cartaz.jpg`: fallback e imagem de compartilhamento.
- `downloads/o-vale-da-inocencia.pdf`: conto revisado em PDF, no formato 15 × 21 cm.
- `downloads/o-vale-da-inocencia.epub`: conto revisado em ePub 3.
- `assets/qr-code-vale-da-inocencia.png`: QR Code em PNG.
- `assets/qr-code-vale-da-inocencia.svg`: QR Code vetorial para impressão.

## Fluxo

QR Code → landing → nome + e-mail + WhatsApp → Google Sheet privada → liberação de PDF/ePub.

## Integração de leads

- Planilha privada: **Leads — O Vale da Inocência**.
- Endpoint do Google Apps Script implantado como **App da Web**.
- Execução: proprietário da planilha.
- Acesso: qualquer pessoa pode enviar; os leads não ficam públicos.
- A URL `/exec` está configurada no objeto `config`, no início de `app.js`.

## Arquivos digitais

Os botões de pós-cadastro apontam para as versões revisadas em PDF e ePub. Os dois formatos são gerados a partir do mesmo texto-mestre, para evitar divergências, e foram validados antes da publicação.

## Revisão textual

A revisão preservou a voz e o estilo do autor. Foram corrigidas ortografia, pontuação de diálogos, concordância, regência, crase, colocação pronominal, tempos verbais e a inconsistência de grafia `Eliah`/`Elaiah`. O Google Docs original permaneceu inalterado.

## Dados registrados

Data/hora, nome, e-mail, WhatsApp, obra, origem, campanha, UTMs, referrer, URL da landing e consentimentos separados para acesso e marketing.

Nenhum lead é gravado no GitHub; o repositório contém apenas a interface pública e o código do endpoint.
