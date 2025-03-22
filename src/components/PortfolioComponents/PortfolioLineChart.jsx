import { Line, Pie } from "@ant-design/plots";
import { Button, Card, Typography } from "antd";

const TimeframeButtons = ({ text, selected, onClick }) => {
  return (
    <Button
      type="text"
      style={{ color: selected ? "#32CD32" : "black" }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

const LineChart = ({selectedPortfolio}) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [timeframe, setTimeframe] = useState("1D");

  function handleClickTimeframe(e) {
    setTimeframe(e.target.innerText);
  }

  useEffect(() => {
    async function fetchHistoricalData() {
      const historicalData = await getTotalPerPortfolioGroupedByTimestamp(selectedPortfolio);
      setHistoricalData(historicalData);
      const totalValue = await getTotalPerPortfolio(selectedPortfolio)
      setTotalValue(totalValue.total)
    }
    fetchHistoricalData();
  }, [selectedPortfolio]);

  const data = historicalData.map((entry) => ({
    month: new Date(entry.timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    Portfolio: entry.total,
  }));

  const config = {
    data,
    xField: "month",
    yField: "Portfolio",
    smooth: false,
    style: {
      stroke: "#32CD32",
      lineWidth: 2,
    },
    area: {
      style: {
        fill: "l(270) 0:rgba(130, 202, 157, 0.3) 1:rgba(130, 202, 157, 1)",
      },
    },
    tooltip: {
      title: "Portfolio",
      formatter: (datum) => datum.Portfolio,
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "10px" }}>
            <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>
              Portfolio Value
            </Typography.Title>
            <Typography.Title
              level={3}
              style={{ color: "#32CD32", margin: 0, padding: 0 }}
            >
              {totalValue.toFixed(2)}€
            </Typography.Title>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
            alignItems: "center",
          }}
        >
          <TimeframeButtons
            text="1D"
            selected={timeframe === "1D"}
            onClick={handleClickTimeframe}
          />
          <TimeframeButtons
            text="1W"
            selected={timeframe === "1W"}
            onClick={handleClickTimeframe}
          />
          <TimeframeButtons
            text="1M"
            selected={timeframe === "1M"}
            onClick={handleClickTimeframe}
          />
          <TimeframeButtons
            text="3M"
            selected={timeframe === "3M"}
            onClick={handleClickTimeframe}
          />
          <TimeframeButtons
            text="1Y"
            selected={timeframe === "1Y"}
            onClick={handleClickTimeframe}
          />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Line {...config} />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { getCryptoPerPortfolio, getTotalPerPortfolio, getTotalPerPortfolioGroupedByTimestamp } from "../../api/api";

export default LineChart;
