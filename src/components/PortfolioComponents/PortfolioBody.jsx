import { Card } from "antd";
import React, { useEffect, useState } from "react";
import LineChart from "./PortfolioLineChart";
import PortfolioPieChart from "./PortfolioPieChart";

import styles from "./Portfolio.module.css";
import PortfolioProducts from "./PortfolioProducts";
import { getUserCoins } from "../../api/api";

export default function PortfolioBody() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchUserCoins() {
      const response = await getUserCoins(1);
      setProducts(response);
      setLoading(false);
    }
    fetchUserCoins();
  }, []);

  return (
    <div>
      <div className={styles.chartWrapper}>
        <Card
          bodyStyle={{
            padding: "5px",
          }}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #f0f0f0",
          }}
        >
          <LineChart />
        </Card>
        <PortfolioPieChart products={products} loading={loading}/>
      </div>
      <PortfolioProducts products={products} loading={loading}/>
    </div>
  );
}
