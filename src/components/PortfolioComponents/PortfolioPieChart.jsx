import { Line, Pie } from "@ant-design/plots";
import { Card } from "antd";
import React, { useEffect, useState } from "react";

import styles from "./Portfolio.module.css";


export function PieChart({products, loading}) {
  const [data, setData] = useState([]);
  
  let productsNetWorth = products?.reduce((sum, product) => sum + product.current_price, 0).toFixed(2);

  if(products?.length > 3) {
    productsNetWorth = Math.round(productsNetWorth);
  }

  useEffect(() => {
    async function fetchAmountPerCategory() {
      setData([]);
    }
    fetchAmountPerCategory(); 
  }, []);

  console.log(products)

  data?.forEach((element) => {
    element.percentage = ((element.amount * element.current_value / productsNetWorth) * 100);
  });

  productsNetWorth = productsNetWorth + "€";

  const config = {
    data,
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
        content: `€${productsNetWorth}`, // Mostra il totale calcolato
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
          text: productsNetWorth,
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

export default function PortfolioPieChart({products, loading}) {

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
          <PieChart products={products} loading={loading}/>
        </div>
    </Card>
  );
}
