import { useEffect, useState } from "react";

function Upbit() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState([]);

  // 코인 리스트 가져오기
  const getCoins = async () => {
    const response = await fetch("https://api.upbit.com/v1/market/all");
    const json = await response.json();
    const krw = json.filter((el) => el.market.includes("KRW"));

    setCoins(krw);
    setLoading(false);
  };

  // 코인 이름 배열

  // const coinName = coins.map((el) => el.market).join();

  // 코인 현재 가격 가져오기
  const getPrice = async () => {
    let url =
      "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-NEO,KRW-MTL,KRW-XRP,KRW-ETC,KRW-OMG,KRW-SNT,KRW-WAVES,KRW-XEM,KRW-QTUM,KRW-LSK,KRW-STEEM,KRW-XLM,KRW-ARDR,KRW-ARK,KRW-STORJ,KRW-GRS,KRW-REP,KRW-ADA,KRW-SBD,KRW-POWR,KRW-BTG,KRW-ICX,KRW-EOS,KRW-TRX,KRW-SC,KRW-ONT,KRW-ZIL,KRW-POLY,KRW-ZRX,KRW-LOOM,KRW-BCH,KRW-BAT,KRW-IOST,KRW-RFR,KRW-CVC,KRW-IQ,KRW-IOTA,KRW-MFT,KRW-ONG,KRW-GAS,KRW-UPP,KRW-ELF,KRW-KNC,KRW-BSV,KRW-THETA,KRW-QKC,KRW-BTT,KRW-MOC,KRW-ENJ,KRW-TFUEL,KRW-MANA,KRW-ANKR,KRW-AERGO,KRW-ATOM,KRW-TT,KRW-CRE,KRW-MBL,KRW-WAXP,KRW-HBAR,KRW-MED,KRW-MLK,KRW-STPT,KRW-ORBS,KRW-VET,KRW-CHZ,KRW-STMX,KRW-DKA,KRW-HIVE,KRW-KAVA,KRW-AHT,KRW-LINK,KRW-XTZ,KRW-BORA,KRW-JST,KRW-CRO,KRW-TON,KRW-SXP,KRW-HUNT,KRW-PLA,KRW-DOT,KRW-SRM,KRW-MVL,KRW-STRAX,KRW-AQT,KRW-GLM,KRW-SSX,KRW-META,KRW-FCT2,KRW-CBK,KRW-SAND,KRW-HUM,KRW-DOGE,KRW-STRK,KRW-PUNDIX,KRW-FLOW,KRW-DAWN,KRW-AXS,KRW-STX,KRW-XEC,KRW-SOL,KRW-MATIC,KRW-NU,KRW-AAVE,KRW-1INCH,KRW-ALGO,KRW-NEAR,KRW-WEMIX,KRW-AVAX,KRW-T,KRW-CELO,KRW-GMT";

    const response = await fetch(url);
    const json = await response.json();
    setPrice(json);
  };

  useEffect(() => {
    getCoins();
    getPrice();
  }, []);
  // console.log(price);
  let test = price.filter((el) => el.market === "KRW-BTC")[0];
  console.log(test["trade_price"]);

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
              {coin.market} {coin.korean_name} {coin.english_name}{" "}
              {
                price.filter((el) => el.market === coin.market)[0][
                  "trade_price"
                ]
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Upbit;
