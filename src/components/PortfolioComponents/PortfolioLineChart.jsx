import { Line, Pie } from "@ant-design/plots";
import { Card } from "antd";

const LineChart = () => {
    const date = new Date();
    const dateMinusOneHour = new Date(date.getTime() - 60 * 60 * 1000);
    const dateMinusOneDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    const dateMinusSevenDays = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    const dateMinusThirtyDays = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
    const dateMinusSixtyDays = new Date(date.getTime() - 60 * 24 * 60 * 60 * 1000);
    const dateMinusNinetyDays = new Date(date.getTime() - 90 * 24 * 60 * 60 * 1000);
  
    const data = [
      { month: dateMinusNinetyDays.toLocaleDateString("en-GB", { day : "2-digit", month: "short" }), value: 0 },
      { month: dateMinusSixtyDays.toLocaleDateString("en-GB", { day : "2-digit", month: "short" }), value: 1000 },
      { month: dateMinusThirtyDays.toLocaleDateString("en-GB", { day : "2-digit", month: "short" }), value: 2000 },
      { month: dateMinusSevenDays.toLocaleDateString("en-GB", { day : "2-digit", month: "short" }), value: 4000 },
      { month: dateMinusOneDay.toLocaleDateString("en-GB", { day : "2-digit", month: "short" }), value: 6000 },
      { month: dateMinusOneHour.toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit" }), value: 5000 },
      { month: date.toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit" }), value: 7000 }
    ];
  
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

import React from 'react'

export default LineChart
