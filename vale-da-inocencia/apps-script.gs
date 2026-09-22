/**
 * O VALE DA INOCÊNCIA — endpoint de captura de leads
 * Implante este projeto como Web App:
 * Executar como: Eu
 * Quem pode acessar: Qualquer pessoa
 * Depois, copie a URL /exec para CONFIG.endpoint no index.html.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads');

    if (!sheet) {
      sheet = ss.insertSheet('Leads');
      sheet.appendRow([
        'Data/Hora','Nome','E-mail','WhatsApp','Obra','Origem','Campanha',
        'UTM Source','UTM Medium','UTM Campaign','UTM Content',
        'Referrer','Landing URL','Consentimento acesso','Consentimento marketing'
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.whatsapp || '',
      data.obra || 'O Vale da Inocência',
      data.origem || '',
      data.campanha || 'vale-da-inocencia',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_content || '',
      data.referrer || '',
      data.landing_url || '',
      data.consentimento ? 'Sim' : 'Não',
      data.marketing ? 'Sim' : 'Não'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('O Vale da Inocência — endpoint ativo.');
}