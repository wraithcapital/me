const coins = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'jupiter-exchange-solana', symbol: 'JUP' }
];

async function fetchPrices() {
  const ids = coins.map(c => c.id).join(',');
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );
  return await res.json();
}

async function updateWidget() {
  const data = await fetchPrices();
  const container = document.getElementById('my-widget');
  container.innerHTML = coins.map(c => `
    <div class="widget-token">
      <div class="name">${c.symbol}</div>
      <div class="price">$${data[c.id].usd}</div>
    </div>
  `).join('');
}

// Load lần đầu
updateWidget();

// Cập nhật mỗi 30 giây
setInterval(updateWidget, 30000);
