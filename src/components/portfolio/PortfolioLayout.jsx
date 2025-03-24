import { Card } from "antd";
import React, { useEffect, useState } from "react";
import PortfolioPieChart from "./PortfolioPieChart";

import styles from "../../styles/Portfolio.module.css";
import PortfolioProducts from "./PortfolioProducts";
import LineChart from "./PortfolioLineChart";
import PortfolioTransactions from "./PortfolioTransactions";
import { getCryptoPerPortfolio, getTotalPerPortfolio } from "../../api/api";
import PortfolioCharts from "./PortfolioCharts";

export default function PortfolioLayout({ loading, selectedPortfolio }) {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  useEffect(() => {
    async function fetchUserCoins() {
      const response = await getCryptoPerPortfolio(selectedPortfolio);
      setProducts(response.Coins);
      const totalValueResponse = await getTotalPerPortfolio(selectedPortfolio);
      setTotalValue(totalValueResponse.total);
    }
    fetchUserCoins();
  }, [selectedPortfolio]);

  return (
    <div>
      <PortfolioCharts
        selectedPortfolio={selectedPortfolio}
        products={products}
        loading={loading}
        totalValue={totalValue}
      />
      <PortfolioProducts products={products} loading={loading} />
      <PortfolioTransactions />
    </div>
  );
}
