async function loadBTC() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true");
    const data = await res.json();
    const price = data.bitcoin.usd;
    const change = data.bitcoin.usd_24h_change;

    document.getElementById("btc-price").textContent = "$" + price.toLocaleString();

    const changeEl = document.getElementById("btc-change");
    changeEl.textContent = change.toFixed(2) + "%";
    changeEl.className = change >= 0 ? "up" : "down";
  } catch (e) {
    console.error("BTC fetch error", e);
  }
}

loadBTC();
setInterval(loadBTC, 60000); // cập nhật mỗi phút
