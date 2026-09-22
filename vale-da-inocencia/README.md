# O Vale da Inocência — landing page

Landing de captura para a leitura gratuita do conto **O Vale da Inocência — A História Esquecida dos Norús**.

## Fluxo
QR Code → landing → nome + e-mail + WhatsApp → Google Sheet privada → liberação de PDF/ePub.

## Antes de publicar
1. Criar uma Google Sheet exclusiva para os leads.
2. Abrir Extensões → Apps Script e colar o conteúdo de `apps-script.gs`.
3. Implantar como Web App, executando como o proprietário e permitindo acesso a qualquer pessoa.
4. Copiar a URL terminada em `/exec` para `CONFIG.endpoint` no `index.html`.
5. Inserir as URLs definitivas em `CONFIG.pdfUrl` e `CONFIG.epubUrl`.
6. Testar em celular e desktop.
7. Só então gerar o QR Code definitivo com UTMs, por exemplo:
   `?utm_source=cartaz&utm_medium=qrcode&utm_campaign=vale-da-inocencia`

## Dados armazenados
Data/hora, nome, e-mail, WhatsApp, obra, origem, campanha, UTMs, referrer, landing URL e consentimentos separados para acesso e marketing.

## Privacidade
Nenhum lead deve ser armazenado no GitHub. O repositório contém apenas a interface pública e o código do endpoint; os dados ficam na planilha privada.
