import { Card } from "antd";
import React from "react";
import LineChart from "./PortfolioLineChart";
import PieChart from "./PortfolioPieChart";
import PortfolioPieChart from "./PortfolioPieChart";
import PortfolioLineChart from "./PortfolioLineChart";

import styles from "./Portfolio.module.css";
import PortfolioProducts from "./PortfolioProducts";

export default function PortfolioBody() {
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
        <PortfolioPieChart />
      </div>
      <PortfolioProducts />
    </div>
  );
}
