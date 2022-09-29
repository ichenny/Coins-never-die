import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Upbit from "../components/Upbit";
import { Search } from "../components/Search";

const Logo = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 50px;
`;

export function Home() {
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [details, setDetails] = useState([]);
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  // const [options, setOptions] = useState(coins);

  // 코인 리스트 가져오기
  const getNames = async () => {
    const response = await fetch("https://api.upbit.com/v1/market/all");
    const json = await response.json();
    const krw = await json.filter((el) => el.market.includes("KRW"));

    setNames(krw);
    setLoading(false);
  };

  // 코인 디테일 정보 가져오기
  const getDetails = async () => {
    let url =
      "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-NEO,KRW-MTL,KRW-XRP,KRW-ETC,KRW-OMG,KRW-SNT,KRW-WAVES,KRW-XEM,KRW-QTUM,KRW-LSK,KRW-STEEM,KRW-XLM,KRW-ARDR,KRW-ARK,KRW-STORJ,KRW-GRS,KRW-REP,KRW-ADA,KRW-SBD,KRW-POWR,KRW-BTG,KRW-ICX,KRW-EOS,KRW-TRX,KRW-SC,KRW-ONT,KRW-ZIL,KRW-POLY,KRW-ZRX,KRW-LOOM,KRW-BCH,KRW-BAT,KRW-IOST,KRW-RFR,KRW-CVC,KRW-IQ,KRW-IOTA,KRW-MFT,KRW-ONG,KRW-GAS,KRW-UPP,KRW-ELF,KRW-KNC,KRW-BSV,KRW-THETA,KRW-QKC,KRW-BTT,KRW-MOC,KRW-ENJ,KRW-TFUEL,KRW-MANA,KRW-ANKR,KRW-AERGO,KRW-ATOM,KRW-TT,KRW-CRE,KRW-MBL,KRW-WAXP,KRW-HBAR,KRW-MED,KRW-MLK,KRW-STPT,KRW-ORBS,KRW-VET,KRW-CHZ,KRW-STMX,KRW-DKA,KRW-HIVE,KRW-KAVA,KRW-AHT,KRW-LINK,KRW-XTZ,KRW-BORA,KRW-JST,KRW-CRO,KRW-TON,KRW-SXP,KRW-HUNT,KRW-PLA,KRW-DOT,KRW-SRM,KRW-MVL,KRW-STRAX,KRW-AQT,KRW-GLM,KRW-SSX,KRW-META,KRW-FCT2,KRW-CBK,KRW-SAND,KRW-HUM,KRW-DOGE,KRW-STRK,KRW-PUNDIX,KRW-FLOW,KRW-DAWN,KRW-AXS,KRW-STX,KRW-XEC,KRW-SOL,KRW-MATIC,KRW-NU,KRW-AAVE,KRW-1INCH,KRW-ALGO,KRW-NEAR,KRW-WEMIX,KRW-AVAX,KRW-T,KRW-CELO,KRW-GMT";
    const response = await fetch(url);
    const json = await response.json();
    setDetails(json);
  };

  //API 두개(코인 리스트 + 코인 디테일 정보) 합치기
  const combine = () => {
    const map = new Map();
    names.forEach((item) => map.set(item.market, item));
    details.forEach((item) =>
      map.set(item.market, { ...map.get(item.market), ...item })
    );
    let temp = Array.from(map.values());

    temp.map((el, index) => (el.id = index + 1));
    console.log(temp);
    setAllCoins(temp);
    setCoins(temp);
  };

  useEffect(() => {
    getNames();
    getDetails();
    combine();
  }, []);

  const HandleInputChange = (event) => {
    const { value } = event.target;
    if (value.includes("\\")) return;
    // 값이 들어오면 setHasText로 hasText값을 true로 설정 (렌더링)
    value ? setHasText(true) : setHasText(false);
    // inputValue의 값을 들어온 값으로 설정 (렌더링2)
    console.log(value);
    setInputValue(value);

    // RegExp 정규식 객체 생성
    // i는 대소문자 구별하지 않고 검색해주는 플래그
    const filterRegex = new RegExp(value, "i");
    // match() 메서드는 문자열이 정규식과 매치되는 부분을 검색
    // 기존 데이터 중에서 input 값과 맞는 것만 남겨서 배열에 할당
    const resultOptions = allCoins.filter((option) =>
      option.english_name.match(filterRegex)
    );
    setCoins(resultOptions);
  };

  return (
    <>
      <Logo>Coins Never Die</Logo>
      {console.log("렌더링했다")}
      <Search
        allCoins={allCoins}
        setAllCoins={setAllCoins}
        coins={coins}
        setCoins={setCoins}
        HandleInputChange={HandleInputChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
        hasText={hasText}
        setHasText={setHasText}
      />
      <Upbit names={names} details={details} coins={coins} loading={loading} />;
    </>
  );
}
