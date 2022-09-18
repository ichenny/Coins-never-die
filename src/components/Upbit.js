import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import "bootstrap/dist/css/bootstrap.min.css";

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
  console.log(map);
  const coins = Array.from(map.values());

  coins.map((el, index) => (el.id = index + 1));
  console.log(coins);

  const columns = [
    { dataField: "id", text: "순위", style: { width: "10%" }, sort: true },
    { dataField: "english_name", text: "종목", style: { width: "25%" } },
    {
      dataField: "trade_price",
      text: "현재가",
      style: { width: "15%" },
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let tradePrice = Number(cell).toLocaleString("ko-KR");
        return tradePrice;
      },
    },
    {
      dataField: "acc_trade_price_24h",
      text: "누적거래대금(24h)",
      style: { width: "20%" },
      sort: true,
      formatter: (cell) => {
        let accTrade = Math.round(cell / 1000000) * 1000000;
        accTrade = accTrade.toLocaleString("ko-KR");
        accTrade = accTrade.slice(0, accTrade.length - 8);
        return accTrade + " 백만";
      },
    },
    {
      dataField: "signed_change_rate",
      text: "변동률",
      style: { width: "15%" },
      formatter: (cell) => {
        let changeRate = (cell * 100).toFixed(2);
        return changeRate > 0 ? (
          <span>
            <VscTriangleUp
              style={{
                color: "red",
              }}
            />{" "}
            {changeRate} %
          </span>
        ) : changeRate < 0 ? (
          <span>
            <VscTriangleDown
              style={{
                color: "blue",
              }}
            />{" "}
            {Math.abs(changeRate)} %
          </span>
        ) : (
          changeRate + " %"
        );
      },
    },
    {
      dataField: "change",
      text: "그래프",
      style: { width: "20%" },
      // 조건에 따라 그래프 구현할 부분
      // formatter: (cell) => {
      //   (cell === "FALL") ? ("하강")
      // }
    },
  ];

  // 처음 렌더링할 때 랭킹을 기준으로 오름차순 정렬
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 20,
    lastPageText: "끝",
    firstPageText: "처음",
    nextPageText: ">",
    prePageText: "<",
    // showTotal: true,
    // alwaysShowAllBtns: true,
    // onPageChange: function (page, sizePerPage) {
    //   console.log("page", page);
    //   console.log("sizePerPage", sizePerPage);
    // },
    // onSizePerPageChange: function (page, sizePerPage) {
    //   console.log("page", page);
    //   console.log("sizePerPage", sizePerPage);
    // },
  });

  return (
    <div className="container">
      <h1>Coins Never Die</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={coins}
          columns={columns}
          defaultSorted={defaultSorted}
          pagination={pagination}
          hover
        />
      )}
    </div>
  );
}

export default Upbit;
