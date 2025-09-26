const widget = document.querySelector('gecko-coin-price-static-headline-widget');
widget.addEventListener('load', () => {
  const shadow = widget.shadowRoot;
  if (shadow) {
    // Ẩn dòng footer "Powered by CoinGecko"
    const footer = shadow.querySelector('footer');
    if (footer) footer.style.display = 'none';

    // Ẩn dropdown chọn USD
    const currencySelector = shadow.querySelector('.currency-selector');
    if (currencySelector) currencySelector.style.display = 'none';
  }
});
