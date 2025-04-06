import { Card } from "antd";
import React from "react";
import PortfolioPieChart from "./PortfolioPieChart";
import LineChart from "./LineChart";

import styles from "../../styles/Portfolio.module.css";
import CryptoPortfolioTracker from "./LineChart";

export default function PortfolioCharts({selectedPortfolio, products, loading, totalValue}) {

    if (loading) {
        return <div>Loading...</div>;
    }
    
  return (
    <div className={styles.chartWrapper}>
        <LineChart />
        <PortfolioPieChart />
    </div>
  );
}
