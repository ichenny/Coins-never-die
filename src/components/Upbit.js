import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";

export default function Upbit({ names, details, coins, loading }) {
  const navigate = useNavigate();

  // 행 클릭하면 페이지 이동하는 함수
  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
      // window.location.href = `/coin/${rowIndex}`;
      // navigate.push({ state: coins });
      console.log(e);
      navigate(`/coin/${e.target.innerHTML}`, {
        state: {
          data: coins,
        },
      });
    },
  };

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
    sizePerPage: 10,
    lastPageText: "끝",
    firstPageText: "처음",
    nextPageText: ">",
    prePageText: "<",
  });

  return (
    <div className="container">
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
          rowEvents={tableRowEvents}
        />
      )}
    </div>
  );
}
