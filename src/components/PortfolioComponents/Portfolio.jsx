import React from "react";

import styles from "./Portfolio.module.css";
import StatCard from "../StatCard/StatCard";
import { Line, Pie } from "@ant-design/plots";
import { Card } from "antd";
import LineChart from "./PortfolioLineChart";
import PieChart from "./PortfolioPieChart";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";





function Portfolio() {
  return (
    <div className={styles.Portfolio}>
      <PortfolioHeader />
      <PortfolioBody />
    </div>
  );
}

export default Portfolio;
