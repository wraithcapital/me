async function fetchPrices() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana,jupiter-exchange-solana&vs_currencies=usd'
  );
  const data = await res.json();
  return data;
}
