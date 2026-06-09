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
    
    // ========================================================
    // CASO 1: APENAS RASTREAMENTO DE EVENTOS ISOLADOS (CAPI)
    // ========================================================
    if (data.action === "track_event") {
      var eventTime = Math.floor(new Date().getTime() / 1000);
      var eventData = {
        "event_name": data.event_name,
        "event_time": eventTime,
        "event_id": data.event_id,
        "event_source_url": data.url || data.event_source_url || "",
        "action_source": "website",
        "user_data": buildUserData(data)
      };
      
      if (data.custom_data) {
        eventData.custom_data = data.custom_data;
      }
      
      var capiResult = sendCapiEvent(eventData, data.test_event_code);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        "status": "success", 
        "message": "Evento enviado com sucesso para CAPI", 
        "event": data.event_name,
        "capi_result": capiResult 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }
    
    // ========================================================
    // CASO 2: ENVIO DE FORMULÁRIO (SALVA LEAD E GERA CONVERSÃO)
    // ========================================================
    
    // Captura a planilha ativa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
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
    
    // --------------------------------------------------------
    // Envio dos eventos do funil de conversão para o Meta CAPI
    // --------------------------------------------------------
    var eventTime = Math.floor(timestamp.getTime() / 1000);
    var userData = buildUserData(data);
    var capiResults = {};
    
    // IDs de desduplicação enviados do frontend ou gerados de fallback
    var leadEventId = data.lead_event_id || ("ld_" + timestamp.getTime() + "_" + Math.floor(Math.random() * 1000));
    var addPaymentInfoEventId = data.add_payment_info_event_id || ("api_" + timestamp.getTime() + "_" + Math.floor(Math.random() * 1000));
    var purchaseEventId = data.purchase_event_id || ("pur_" + timestamp.getTime() + "_" + Math.floor(Math.random() * 1000));
    
    // 1. Enviar evento 'Lead'
    var leadEvent = {
      "event_name": "Lead",
      "event_time": eventTime,
      "event_id": leadEventId,
      "event_source_url": data.url || "",
      "action_source": "website",
      "user_data": userData
    };
    capiResults.lead = sendCapiEvent(leadEvent, data.test_event_code);
    
    // 2. Enviar evento 'AddPaymentInfo'
    var addPaymentInfoEvent = {
      "event_name": "AddPaymentInfo",
      "event_time": eventTime,
      "event_id": addPaymentInfoEventId,
      "event_source_url": data.url || "",
      "action_source": "website",
      "user_data": userData
    };
    capiResults.add_payment_info = sendCapiEvent(addPaymentInfoEvent, data.test_event_code);
    
    // 3. Enviar evento 'Purchase' (Compra gratuita)
    var purchaseEvent = {
      "event_name": "Purchase",
      "event_time": eventTime,
      "event_id": purchaseEventId,
      "event_source_url": data.url || "",
      "action_source": "website",
      "user_data": userData,
      "custom_data": {
        "currency": "BRL",
        "value": 0.00
      }
    };
    capiResults.purchase = sendCapiEvent(purchaseEvent, data.test_event_code);
    
    // Retorna resposta de sucesso para o site
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "rowAdded": sheet.getLastRow(),
      "capi_results": capiResults 
    }))
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

// ==========================================
// FUNÇÕES AUXILIARES E DE CRIPTOGRAFIA
// ==========================================

/**
 * Constrói o objeto de dados do usuário (user_data) normalizado e com hashes.
 */
function buildUserData(data) {
  var userData = {};
  
  // Sinais do navegador (ajudam no match)
  if (data.client_user_agent) {
    userData.client_user_agent = data.client_user_agent;
  }
  if (data.fbp) {
    userData.fbp = data.fbp;
  }
  if (data.fbc) {
    userData.fbc = data.fbc;
  }
  
  // Parâmetros de identificação do cliente
  if (data.email) {
    userData.em = [sha256(data.email)];
  }
  if (data.whats) {
    userData.ph = [sha256(normalizePhone(data.whats))];
  }
  if (data.nome) {
    var nameParts = parseName(data.nome);
    if (nameParts.firstName) {
      userData.fn = [sha256(nameParts.firstName)];
    }
    if (nameParts.lastName) {
      userData.ln = [sha256(nameParts.lastName)];
    }
  }
  
  // Dados de localização fixos como fallback se necessário, ou recebidos
  if (data.cidade) {
    userData.ct = [sha256(data.cidade)];
  }
  if (data.genero) {
    userData.ge = [sha256(data.genero)];
  }
  
  return userData;
}

/**
 * Normaliza e gera o hash SHA-256 de uma string para o Meta CAPI.
 */
function sha256(str) {
  if (!str) return null;
  var normalized = str.toString().trim().toLowerCase();
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, normalized, Utilities.Charset.UTF_8);
  var hex = "";
  for (var i = 0; i < digest.length; i++) {
    var val = digest[i];
    if (val < 0) val += 256;
    var byteString = val.toString(16);
    if (byteString.length == 1) byteString = "0" + byteString;
    hex += byteString;
  }
  return hex;
}

/**
 * Normaliza telefone para o formato padrão do Meta (somente números, com DDI).
 */
function normalizePhone(phone) {
  if (!phone) return null;
  var cleaned = phone.toString().replace(/\D/g, ""); // Remove não dígitos
  if (cleaned.length === 0) return null;
  
  // Se for celular brasileiro sem o código do país (DDI 55)
  if (cleaned.length <= 11) {
    cleaned = "55" + cleaned;
  }
  return cleaned;
}

/**
 * Divide o nome em primeiro e sobrenome.
 */
function parseName(fullName) {
  var result = { firstName: "", lastName: "" };
  if (!fullName) return result;
  
  var parts = fullName.toString().trim().split(/\s+/);
  if (parts.length > 0) {
    result.firstName = parts[0];
  }
  if (parts.length > 1) {
    result.lastName = parts.slice(1).join(" ");
  }
  return result;
}

/**
 * Dispara uma requisição POST direta para a API de Conversões do Meta.
 */
function sendCapiEvent(eventData, testEventCode) {
  var url = "https://graph.facebook.com/" + META_API_VERSION + "/" + META_PIXEL_ID + "/events?access_token=" + META_ACCESS_TOKEN;
  
  var payload = {
    "data": [eventData]
  };
  
  if (testEventCode) {
    payload["test_event_code"] = testEventCode;
  }
  
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    var responseText = response.getContentText();
    var responseCode = response.getResponseCode();
    Logger.log("CAPI Event '" + eventData.event_name + "' Response (" + responseCode + "): " + responseText);
    return {
      code: responseCode,
      body: responseText
    };
  } catch (err) {
    Logger.log("Erro no envio do evento '" + eventData.event_name + "' para CAPI: " + err.toString());
    return {
      code: 500,
      error: err.toString()
    };
  }
}
