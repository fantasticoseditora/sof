/**
 * O VALE DA INOCÊNCIA — endpoint de captura de leads
 *
 * Implantação:
 * 1. Crie um projeto em script.google.com e cole este arquivo.
 * 2. Implantar > Nova implantação > App da Web.
 * 3. Executar como: Eu | Quem pode acessar: Qualquer pessoa.
 * 4. Copie a URL /exec para endpoint em config.js.
 */

const SPREADSHEET_ID = '1eXGBTMQCvEcHvLR-7t4YK2jSbakilCKNb2OohfiH1TI';
const SHEET_NAME = 'Leads';

const HEADERS = [
  'Data/Hora',
  'Nome',
  'E-mail',
  'WhatsApp',
  'Obra',
  'Origem',
  'Campanha',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'UTM Content',
  'Referrer',
  'Landing URL',
  'Consentimento acesso',
  'Consentimento marketing'
];

function doGet() {
  return jsonResponse_({ ok: true, service: 'vale-da-inocencia', status: 'active' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    validatePayload_(data);

    const sheet = getLeadSheet_();
    sheet.appendRow([
      new Date(),
      clean_(data.nome, 100),
      clean_(data.email, 160).toLowerCase(),
      clean_(data.whatsapp, 20),
      clean_(data.obra, 100) || 'O Vale da Inocência',
      clean_(data.origem, 80) || 'Landing Page',
      clean_(data.campanha, 100) || 'vale-da-inocencia',
      clean_(data.utm_source, 100),
      clean_(data.utm_medium, 100),
      clean_(data.utm_campaign, 100),
      clean_(data.utm_content, 160),
      clean_(data.referrer, 500),
      clean_(data.landing_url, 500),
      data.consentimento_acesso === true ? 'Sim' : 'Não',
      data.consentimento_marketing === true ? 'Sim' : 'Não'
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function setupSheet() {
  getLeadSheet_();
}

function getLeadSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  if (currentHeaders.join('|') !== HEADERS.join('|')) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm:ss');
  return sheet;
}

function validatePayload_(data) {
  if (!data || typeof data !== 'object') throw new Error('Payload inválido.');
  if (!clean_(data.nome, 100)) throw new Error('Nome obrigatório.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean_(data.email, 160))) throw new Error('E-mail inválido.');
  if (!/^\d{10,11}$/.test(clean_(data.whatsapp, 20))) throw new Error('WhatsApp inválido.');
  if (data.consentimento_acesso !== true) throw new Error('Consentimento de acesso obrigatório.');
}

function clean_(value, maxLength) {
  return String(value == null ? '' : value).trim().slice(0, maxLength);
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
