// ticker.js
const coins = ["bitcoin"];

async function fetchPrices() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(",")}&order=market_cap_desc`);
  const data = await res.json();
  const ticker = document.getElementById("ticker");
  ticker.innerHTML = ""; // reset
  data.forEach(coin => {
    const div = document.createElement("div");
    div.className = "token";
    const changeClass = coin.price_change_percentage_24h >= 0 ? "up" : "down";
    const changeText = (coin.price_change_percentage_24h || 0).toFixed(2) + "%";
    div.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}">
      ${coin.symbol.toUpperCase()} 
      <span class="price">$${coin.current_price.toLocaleString("en-US")}</span> 
      <span class="change ${changeClass}">${changeText}</span>
    `;
    ticker.appendChild(div);
  });
}

// Refresh mỗi 30 giây
fetchPrices();
setInterval(fetchPrices, 30000);
