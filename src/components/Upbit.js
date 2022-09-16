import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Upbit() {
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [details, setDetails] = useState([]);

  // 코인 리스트 가져오기
  const getNames = async () => {
    const response = await fetch("https://api.upbit.com/v1/market/all");
    const json = await response.json();
    const krw = await json.filter((el) => el.market.includes("KRW"));

    setNames(krw);
    setLoading(false);
  };

  // 코인 이름
  // const coinName = names.map((el) => el.market).join();

  // 코인 디테일 정보 가져오기
  const getDetails = async () => {
    let url =
      "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-NEO,KRW-MTL,KRW-XRP,KRW-ETC,KRW-OMG,KRW-SNT,KRW-WAVES,KRW-XEM,KRW-QTUM,KRW-LSK,KRW-STEEM,KRW-XLM,KRW-ARDR,KRW-ARK,KRW-STORJ,KRW-GRS,KRW-REP,KRW-ADA,KRW-SBD,KRW-POWR,KRW-BTG,KRW-ICX,KRW-EOS,KRW-TRX,KRW-SC,KRW-ONT,KRW-ZIL,KRW-POLY,KRW-ZRX,KRW-LOOM,KRW-BCH,KRW-BAT,KRW-IOST,KRW-RFR,KRW-CVC,KRW-IQ,KRW-IOTA,KRW-MFT,KRW-ONG,KRW-GAS,KRW-UPP,KRW-ELF,KRW-KNC,KRW-BSV,KRW-THETA,KRW-QKC,KRW-BTT,KRW-MOC,KRW-ENJ,KRW-TFUEL,KRW-MANA,KRW-ANKR,KRW-AERGO,KRW-ATOM,KRW-TT,KRW-CRE,KRW-MBL,KRW-WAXP,KRW-HBAR,KRW-MED,KRW-MLK,KRW-STPT,KRW-ORBS,KRW-VET,KRW-CHZ,KRW-STMX,KRW-DKA,KRW-HIVE,KRW-KAVA,KRW-AHT,KRW-LINK,KRW-XTZ,KRW-BORA,KRW-JST,KRW-CRO,KRW-TON,KRW-SXP,KRW-HUNT,KRW-PLA,KRW-DOT,KRW-SRM,KRW-MVL,KRW-STRAX,KRW-AQT,KRW-GLM,KRW-SSX,KRW-META,KRW-FCT2,KRW-CBK,KRW-SAND,KRW-HUM,KRW-DOGE,KRW-STRK,KRW-PUNDIX,KRW-FLOW,KRW-DAWN,KRW-AXS,KRW-STX,KRW-XEC,KRW-SOL,KRW-MATIC,KRW-NU,KRW-AAVE,KRW-1INCH,KRW-ALGO,KRW-NEAR,KRW-WEMIX,KRW-AVAX,KRW-T,KRW-CELO,KRW-GMT";
    const response = await fetch(url);
    const json = await response.json();
    setDetails(json);
  };

  useEffect(() => {
    getNames();
    getDetails();
  }, []);

  //API 두개(코인 리스트 + 코인 디테일 정보) 합치기
  const map = new Map();
  names.forEach((item) => map.set(item.market, item));
  details.forEach((item) =>
    map.set(item.market, { ...map.get(item.market), ...item })
  );
  const coins = Array.from(map.values());

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
              <Link to={`/coin/${coin.market}`}>
                Ranking: {coins.indexOf(coin) + 1} {coin.market}{" "}
                {coin.korean_name} {coin.english_name} {coin.trade_price}원{" "}
                {(coin.signed_change_rate * 100).toFixed(2)} % {coin.change}{" "}
                {coin.acc_trade_price_24h} 원
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Upbit;
