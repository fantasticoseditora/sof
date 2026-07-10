/**
 * FANTÁSTICOS — recebe as respostas do formulário HTML
 * e grava numa aba da planilha, salvando o arquivo (se houver) no Drive.
 *
 * COMO INSTALAR:
 * 1. Crie uma Planilha Google nova (pode chamar de "Leads Fantásticos").
 * 2. Menu Extensões > Apps Script.
 * 3. Apague o conteúdo padrão do arquivo Code.gs e cole este código inteiro.
 * 4. Clique no ícone de salvar (disquete).
 * 5. Clique em Implantar > Nova implantação.
 * 6. Em "Tipo", escolha "App da Web".
 * 7. Em "Executar como", deixe "Eu" (sua conta).
 * 8. Em "Quem pode acessar", escolha "Qualquer pessoa".
 * 9. Clique em Implantar, autorize as permissões pedidas (é o seu próprio script, pode confiar).
 * 10. Copie a URL que termina em /exec — essa é a URL que vai na constante
 *     SCRIPT_URL do arquivo formulario-fantasticos.html.
 *
 * Se editar o código depois de já ter implantado, você precisa criar uma
 * NOVA implantação (ou gerenciar implantações > editar > nova versão) pra
 * que a mudança realmente entre no ar.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Respostas');
    if (!sheet) {
      sheet = ss.insertSheet('Respostas');
      sheet.appendRow([
        'Data/Hora', 'Nome', 'E-mail', 'WhatsApp', 'Gênero', 'Público-alvo',
        'Descrição do livro', 'Status do livro', 'Rede social', 'Link do original', 'Consentimento'
      ]);
    }

    var fileUrl = '';
    if (data.arquivoBase64 && data.arquivoNome) {
      var folder = getOrCreateFolder('Fantásticos - Originais recebidos');
      var bytes = Utilities.base64Decode(data.arquivoBase64);
      var blob = Utilities.newBlob(bytes, data.arquivoTipo || 'application/octet-stream', data.arquivoNome);
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    sheet.appendRow([
      new Date(),
      data.nome || '',
      data.email || '',
      data.whatsapp || '',
      data.genero || '',
      data.publico || '',
      data.descricao || '',
      data.status || '',
      data.rede || '',
      fileUrl,
      data.consentimento ? 'Sim' : 'Não'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}

// Necessário existir, mesmo vazia, para o Apps Script aceitar a implantação como Web App.
function doGet(e) {
  return ContentService.createTextOutput('Fantásticos — endpoint ativo.');
}
