function extractProductInfo(html) {
  const nameMatch = html.match(/js-bottomTrackingAddComparison_targetText">(.*?)<\/span>/);
  const numberMatch = html.match(/商品番号：([\w-]+)/);
  const priceMatch = html.match(/a-price_value">¥([\d,]+)/);
  const modelMatch = html.match(/型番\s[\d-]+\s(\d+)/);

  return {
    name: nameMatch ? nameMatch[1].trim() : null,
    number: numberMatch ? numberMatch[1].trim() : null,
    price: priceMatch ? priceMatch[1].replace(/,/g, '') : null,
    model: modelMatch ? modelMatch[1].trim() : null,
  };
}

module.exports = { extractProductInfo };
