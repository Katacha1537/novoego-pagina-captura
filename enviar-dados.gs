function doPost(e) {
  // Configuração de CORS para responder requisições do site
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // FUNÇÃO AUXILIAR DE LOG (Cria uma aba Debug na planilha para capturar erros e requisições)
  function logDebug(tag, message, details) {
    try {
      var debugSheet = spreadsheet.getSheetByName("Debug");
      if (!debugSheet) {
        debugSheet = spreadsheet.insertSheet("Debug");
        debugSheet.appendRow(["Data e Hora", "Tag", "Mensagem", "Detalhes"]);
        debugSheet.getRange(1, 1, 1, 4).setFontWeight("bold");
      }
      debugSheet.appendRow([new Date(), tag, message, details || ""]);
    } catch (err) {}
  }

  try {
    var contents = e && e.postData ? e.postData.contents : null;
    logDebug("Recebido", "Requisição recebida", contents);
    
    if (!contents) {
      throw new Error("Corpo da requisição (postData) está vazio.");
    }
    
    var data = JSON.parse(contents);
    var timestamp = new Date();
    
    var sheet;
    var columnHeaders;
    var newRow;
    
    // Roteamento inteligente baseado no tipo de formulário enviado
    if (data.tipo === 'pre-matricula') {
      logDebug("Roteamento", "Identificado como pre-matricula", data.tipo);
      
      sheet = spreadsheet.getSheetByName("Formulario");
      if (!sheet) {
        sheet = spreadsheet.insertSheet("Formulario");
        logDebug("Planilha", "Criada nova aba Formulario", "");
      }
      
      columnHeaders = [
        "Data e Hora",
        "Nome",
        "WhatsApp",
        "E-mail",
        "Dificuldade",
        "O que trouxe",
        "Sessão Perfeita",
        "O que impede",
        "Investimento",
        "Obstáculo",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
        "UTM Term",
        "UTM Content",
        "URL da Página"
      ];
      
      newRow = [
        timestamp,
        data.nome || "",
        data.whats || "",
        data.email || "",
        data.dificuldade || "",
        data.trouxe || "",
        data.sessao_perfeita || "",
        data.impede || "",
        data.investir || "",
        data.obstaculo || "",
        data.utm_source || "",
        data.utm_medium || "",
        data.utm_campaign || "",
        data.utm_term || "",
        data.utm_content || "",
        data.url || ""
      ];
      
    } else {
      logDebug("Roteamento", "Identificado como leads padrao", data.tipo || "sem tipo");
      
      sheet = spreadsheet.getSheetByName("Pagina de Captura");
      if (!sheet) {
        sheet = spreadsheet.insertSheet("Pagina de Captura");
        logDebug("Planilha", "Criada nova aba Pagina de Captura", "");
      }
      
      columnHeaders = [
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
      
      newRow = [
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
    }
    
    // Se a aba estiver vazia, adiciona os cabeçalhos em negrito
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columnHeaders);
      sheet.getRange(1, 1, 1, columnHeaders.length).setFontWeight("bold");
      logDebug("Planilha", "Cabeçalhos adicionados", sheet.getName());
    }
    
    // Salva a nova linha
    sheet.appendRow(newRow);
    logDebug("Sucesso", "Linha adicionada com sucesso", "Linha: " + sheet.getLastRow());
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "rowAdded": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    logDebug("Erro", "Erro ao executar doPost", error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
}

function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT).setHeaders(headers);
}
