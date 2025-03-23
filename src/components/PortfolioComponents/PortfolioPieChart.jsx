import { Line, Pie } from "@ant-design/plots";
import { Card } from "antd";
import React, { useEffect, useState } from "react";

import styles from "./Portfolio.module.css";



export function PieChart({products, loading, totalValue}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = products?.map((product) => {
      return {
        name: product.Coin.name,
        percentage: product.Percentage * 100
      };
    });

    setData(data);
  }
  , [products, totalValue]);

  const label = totalValue + "€";

  const config = {
    data : data,
    angleField: "percentage",
    colorField: "name",
    radius: 0.8,
    innerRadius: 0.7,
    color: ["#00E4FF", "#FFD700", "#FF69B4", "#9370DB"],
    statistic: {
      title: {
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          color: '#30BF78', // Colore del testo
        },
        content: "Totale",
      },
      content: {
        style: {
          fontSize: "22px",
          fontWeight: "bold",
          color: '#30BF78', // Colore del testo
        },
        content:  `${label}`,
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
          text: `${label}`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 28,
          fontStyle: "bold",
          fill: '#3b3b3b',
        },
      },
    ],
  };

  return <Pie {...config} />;
};

export default function PortfolioPieChart({products, loading, totalValue}) {

  if (loading) {
    return <div>Loading..</div>
  }

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
      }}
    >
        <div className={styles.pieChartWrapper}>
          <PieChart products={products} loading={loading} totalValue={totalValue}/>
        </div>
    </Card>
  );
}
