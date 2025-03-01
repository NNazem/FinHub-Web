import { Line, Pie } from "@ant-design/plots";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import PortfolioPieChartLegend from "./PortfolioPieChartLegend";

import styles from "./Portfolio.module.css";
import { GetAmountPerCategory } from "../../api/api";


const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAmountPerCategory() {
      const response = await GetAmountPerCategory(1);
      console.log(response);
      setData(response.amount_per_category);
    }
    fetchAmountPerCategory(); 
  }, []);


  const total = data.reduce((sum, item) => sum + item.amount, 0).toFixed(2);

  const config = {
    data,
    angleField: "amount",
    colorField: "category",
    radius: 0.8,
    innerRadius: 0.7,
    color: ["#00E4FF", "#FFD700", "#FF69B4", "#9370DB"],
    statistic: {
      title: {
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: "#000", // Colore del testo
        },
        content: "Totale",
      },
      content: {
        style: {
          fontSize: "22px",
          fontWeight: "bold",
          color: "#000", // Colore del testo
        },
        content: `€${total}`, // Mostra il totale calcolato
      },
    },
    legend: false,
    label: false,
    pieStyle: {
      lineCap: "round",
      lineJoin: "round",
    },
    annotations: [
      {
        type: "text",
        style: {
          text: total,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 40,
          fontStyle: "bold",
        },
      },
    ],
  };

  return <Pie {...config} />;
};
export default function PortfolioPieChart() {
  return (
    <Card
      bodyStyle={{
        padding: "0px",
        marginTop: "-50px",
      }}
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
        overflow: "hidden", // Nasconde il contenuto ineccesso
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div className={styles.pieChartWrapper}>
          <PieChart />
        </div>
       <PortfolioPieChartLegend />
      </div>
    </Card>
  );
}
