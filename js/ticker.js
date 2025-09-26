(function(){
  const priceEl = document.getElementById('btc-price');
  const changeEl = document.getElementById('btc-change');
  const timeEl = document.getElementById('btc-time');
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true';

  const fmt = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  async function fetchBTC() {
    try {
      const res = await fetch(apiUrl, { cache: "no-store" });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const btc = data.bitcoin;
      if (!btc || !btc.usd) throw new Error('Invalid data');

      priceEl.textContent = fmt.format(btc.usd);

      const changePercent = (btc.usd_24h_change ?? 0);
      const changeStr = (changePercent>=0?'+':'') + changePercent.toFixed(2) + '%';
      changeEl.textContent = changeStr;
      changeEl.style.visibility = 'visible';
      changeEl.classList.remove('up','down');
      changeEl.classList.add(changePercent >= 0 ? 'up' : 'down');

      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second:'2-digit'});
    } catch (err) {
      console.warn('BTC ticker error', err);
      priceEl.textContent = '--';
      changeEl.style.visibility = 'hidden';
      timeEl.textContent = 'error';
    }
  }

  fetchBTC();
  const intervalMs = 10000; 
  let timer = setInterval(fetchBTC, intervalMs);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      fetchBTC();
      timer = setInterval(fetchBTC, intervalMs);
    }
  });
})();
