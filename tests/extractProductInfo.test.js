const { extractProductInfo } = require('../extractProductInfo');

describe('extractProductInfo', () => {
  test('extracts all fields', () => {
    const html = `
      <span class="a-span u-text-normal js-bottomTrackingAddComparison_targetText">Example Product</span>
      <div>商品番号：ABC123</div>
      <span class="a-price_value">¥1,234</span>
      <div>型番 123-456 7890</div>`;
    expect(extractProductInfo(html)).toEqual({
      name: 'Example Product',
      number: 'ABC123',
      price: '1234',
      model: '7890',
    });
  });

  test('handles price with multiple commas', () => {
    const html = `
      <span class="a-span u-text-normal js-bottomTrackingAddComparison_targetText">Product</span>
      <div>商品番号：XYZ789</div>
      <span class="a-price_value">¥12,345,678</span>
      <div>型番 000-1111 2222</div>`;
    expect(extractProductInfo(html).price).toBe('12345678');
  });

  test('handles missing fields', () => {
    const html = `<span class="a-span u-text-normal js-bottomTrackingAddComparison_targetText">Only Name</span>`;
    expect(extractProductInfo(html)).toEqual({
      name: 'Only Name',
      number: null,
      price: null,
      model: null,
    });
  });
});
