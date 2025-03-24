import React, { useEffect, useState } from "react";

import styles from "../styles/Portfolio.module.css";
import PortfolioHeader from "../components/portfolio/PortfolioHeader";
import Navbar from "../components/layout/Navbar";
import { getPortfolioByUserId } from "../api/api";
import PortfolioLayout from "../components/portfolio/PortfolioLayout";

function Portfolio() {
  const userId = 2;
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolios() {
      const response = await getPortfolioByUserId(userId);

      const items = response.Portfolios.map((portfolio) => ({
        key: portfolio.id,
        label: portfolio.name,
      }));

      setPortfolios(items);
      setSelectedPortfolio(items[0].key);
      setLoading(false);
    }
    fetchPortfolios();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Navbar
        portfolios={portfolios}
        setPortfolios={setPortfolios}
        userId={userId}
        setSelectedPortfolio={setSelectedPortfolio}
        loading={loading}
      />
      <div className={styles.Portfolio}>
        <PortfolioHeader />
        <PortfolioLayout
          loading={loading}
          selectedPortfolio={selectedPortfolio}
        />
      </div>
    </div>
  );
}

export default Portfolio;
