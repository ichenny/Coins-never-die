import { useState } from "react";

function CoinList() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });

  return (
    <div>
      <h1>Coin list</h1>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CoinList;
