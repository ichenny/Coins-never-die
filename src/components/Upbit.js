import { useEffect, useState } from "react";

function Upbit() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState([]);

  // 코인 리스트 가져오기
  const getCoins = async () => {
    const response = await fetch("https://api.upbit.com/v1/market/all");
    const json = await response.json();
    const krw = await json.filter((el) => el.market.includes("KRW"));

    setCoins(krw);
    setLoading(false);
  };

  const krwName = coins.map((el) => el.market).join();

  // 코인 현재 가격 가져오기
  const getPrice = async (name) => {
    const apiUrl = "https://api.upbit.com/v1/ticker?markets=";
    const priceUrl = apiUrl + name;
    console.log(priceUrl);

    const response = await fetch(priceUrl);
    const priceJson = await response.json();
    console.log(priceJson);
    console.log(typeof priceJson);
    const tradePrice = await priceJson.map((el) => el["trade_price"]);
    setPrice(tradePrice);
    console.log("");
  };

  useEffect(() => {
    getCoins();
  }, []);

  useEffect(() => {
    getPrice(krwName);
  }, [coins]);

  return (
    <div>
      <h1>Coin list</h1>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.market}>
              {coin.market} {coin.korean_name} {coin.english_name}
            </li>
          ))}
          {price.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Upbit;
