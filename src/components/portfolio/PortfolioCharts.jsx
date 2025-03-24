import { Card } from "antd";
import React from "react";
import PortfolioPieChart from "./PortfolioPieChart";
import PortfolioLineChart from "./PortfolioLineChart";

import styles from "../../styles/Portfolio.module.css";

export default function PortfolioCharts({selectedPortfolio, products, loading, totalValue}) {

    if (loading) {
        return <div>Loading...</div>;
    }
    
  return (
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
        <PortfolioLineChart
          width={820}
          height={450}
          selectedPortfolio={selectedPortfolio}
        />
      </Card>
      <PortfolioPieChart
        products={products}
        loading={loading}
        totalValue={totalValue}
      />
    </div>
  );
}
