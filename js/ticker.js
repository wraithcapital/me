async function loadBTC() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
  const data = await res.json();
  const price = data.bitcoin.usd;
  const change = data.bitcoin.usd_24h_change;
  document.getElementById("btc-price").textContent = "$" + price.toLocaleString();
  const el = document.getElementById("btc-change");
  el.textContent = change.toFixed(2) + "%";
  el.className = change >= 0 ? "up" : "down";
}
loadBTC();
setInterval(loadBTC, 60000);
