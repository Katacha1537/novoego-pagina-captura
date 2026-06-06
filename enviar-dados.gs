/**
 * script-sheets-integration.gs
 * 
 * INSTRUÇÕES DE INSTALAÇÃO E USO:
 * 1. Abra a planilha do Google Sheets onde você deseja salvar os leads.
 * 2. No menu superior, clique em "Extensões" e depois em "Apps Script".
 * 3. Apague todo o código existente no editor padrão e cole este código completo.
 * 4. Clique em salvar (ícone de disquete) ou use Ctrl+S.
 * 5. Clique no botão "Implantar" (canto superior direito) > "Nova implantação".
 * 6. Em "Selecionar tipo", clique no ícone de engrenagem e selecione "App da Web".
 * 7. Configure a implantação:
 *    - Descrição: "Integração Form Novo Ego"
 *    - Executar como: "Eu" (seu e-mail)
 *    - Quem tem acesso: "Qualquer pessoa" (MUITO IMPORTANTE para permitir que o site envie os dados sem autenticação)
 * 8. Clique em "Implantar". Se solicitado, clique em "Autorizar acesso", selecione sua conta do Google e depois clique em "Avançado" > "Acessar Projeto sem título (não seguro)".
 * 9. Copie o URL do App da Web gerado (exemplo: https://script.google.com/macros/s/.../exec).
 * 10. Abra o arquivo "index.html" do seu site, vá na linha que possui a variável `GOOGLE_SHEETS_SCRIPT_URL` e cole a URL entre as aspas simples.
 */

function doPost(e) {
  // Configuração de CORS para responder requisições do site
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  try {
    // Captura a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Converte o corpo do POST (JSON string) para objeto JavaScript
    var data = JSON.parse(e.postData.contents);
    
    // Cabeçalhos que serão criados automaticamente caso a planilha esteja vazia
    var columnHeaders = [
      "Data e Hora", 
      "Nome", 
      "E-mail", 
      "WhatsApp", 
      "UTM Source", 
      "UTM Medium", 
      "UTM Campaign", 
      "UTM Term", 
      "UTM Content", 
      "URL da Página"
    ];
    
    // Se a primeira linha estiver em branco, insere os cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columnHeaders);
      
      // Formata a linha de cabeçalho para ficar em negrito
      sheet.getRange(1, 1, 1, columnHeaders.length).setFontWeight("bold");
    }
    
    // Coleta a data e hora local
    var timestamp = new Date();
    
    // Prepara a nova linha com as informações
    var newRow = [
      timestamp,
      data.nome || "",
      data.email || "",
      data.whats || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_term || "",
      data.utm_content || "",
      data.url || ""
    ];
    
    // Adiciona os dados na última linha disponível da planilha
    sheet.appendRow(newRow);
    
    // Retorna resposta de sucesso para o site
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "rowAdded": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    // Em caso de erro, grava no log e retorna a mensagem do erro
    Logger.log("Erro: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

// Suporte para requisições de pre-flight (CORS Options) se o navegador exigir
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
