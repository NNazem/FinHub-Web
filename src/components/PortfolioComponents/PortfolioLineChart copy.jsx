import { Line, Pie } from "@ant-design/plots";
import { Card } from "antd";

const LineChart = () => {

    const [historicalData, setHistoricalData] = useState([]);


    useEffect(() => {
      async function fetchHistoricalData() {
        const response = await GetUserPortfolioHistoricalValue(1);
        setHistoricalData(response);
      }
      fetchHistoricalData();
    }, []);  

    const data = historicalData.map((entry) => ({
      month : new Date(entry.date).toLocaleString("en-GB", { day: "2-digit", hour: "2-digit", minute: "2-digit"}),
      value : entry.portfolio_value
    }))

    
    const config = {
      data,
      xField: "month",
      yField: "value",
      smooth: true,
      // La configurazione del colore in antd va dentro style
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
        title: "Value",
        formatter: (datum) => datum.value,
      },
    };
  
    return <Line {...config} />;
  };

import React, { useEffect, useState } from 'react'
import { GetUserPortfolioHistoricalValue } from "../../api/api";

export default LineChart
