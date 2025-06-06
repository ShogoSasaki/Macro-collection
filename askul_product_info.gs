function fillProductInfo() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var range = sheet.getActiveRange();
  var cells = range.getValues();

  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells[i].length; j++) {
      var url = cells[i][j];
      if (url) {
        var row = range.getRow() + i;
        var productInfo = getProductInfoFromURL(url);
        sheet.getRange(row, 6).setValue(productInfo.name);    // F: 商品名
        sheet.getRange(row, 2).setValue(productInfo.number);  // B: 商品番号
        sheet.getRange(row, 4).setValue(productInfo.price);   // D: 価格
        sheet.getRange(row, 3).setValue(productInfo.model);   // C: 型番
      }
    }
  }
}

function getProductInfoFromURL(url) {
  var response = UrlFetchApp.fetch(url);
  var html = response.getContentText();

  var nameMatch = html.match(/<span class="a-span u-text-normal js-bottomTrackingAddComparison_targetText">(.*?)<\/span>/);
  var numberMatch = html.match(/お申込番号：(\w+)/);
  var priceMatch = html.match(/<span class="a-price_value">￥(\d+,?\d*)<\/span>/);
  var modelMatch = html.match(/本体\s[\d-]+\s(\d+)/);

  Logger.log("Name Match: " + nameMatch);
  Logger.log("Number Match: " + numberMatch);
  Logger.log("Price Match: " + priceMatch);
  Logger.log("Model Match: " + modelMatch);

  return {
    name: nameMatch ? nameMatch[1].trim() : "該当する商品名なし",
    number: numberMatch ? numberMatch[1].trim() : "該当する商品番号なし",
    price: priceMatch ? priceMatch[1].replace(/,/g, '') : "該当する価格なし",
    model: modelMatch ? modelMatch[1].trim() : "該当する型番なし"
  };
}
