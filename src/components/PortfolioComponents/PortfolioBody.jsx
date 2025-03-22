import { Card } from "antd";
import React, { useEffect, useState } from "react";
import PortfolioPieChart from "./PortfolioPieChart";

import styles from "./Portfolio.module.css";
import PortfolioProducts from "./PortfolioProducts";
import LineChart from "./PortfolioLineChart";
import PortfolioTransactions from "./PortfolioTransactions";
import { getCryptoPerPortfolio } from "../../api/api";

export default function PortfolioBody({selectedPortfolio}) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchUserCoins() {
      const response = await getCryptoPerPortfolio(selectedPortfolio);
      setProducts(response);
      setLoading(false);
    }
    fetchUserCoins();
  }, [selectedPortfolio], []);


  if(loading) {
    return <div>Loading..</div>
  }

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
          <LineChart width={820} height={450} selectedPortfolio={selectedPortfolio} />
        </Card>
      </div>
      <PortfolioProducts products={products} loading={loading}/>
      <PortfolioTransactions/>
    </div>
  );
}
