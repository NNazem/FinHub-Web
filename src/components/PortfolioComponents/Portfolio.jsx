import React, { useEffect, useState } from "react";

import styles from "./Portfolio.module.css";
import PortfolioHeader from "./PortfolioHeader";
import PortfolioBody from "./PortfolioBody";
import { Menu } from "antd";
import Navbar from "../Navbar";
import { getPortfolioByUserId } from "../../api/api";



function Portfolio() {
  const userId = 2;
  const [selectedPortfolio, setSelectedPortfolio] = useState([]);
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
        <PortfolioBody selectedPortfolio={selectedPortfolio}/>
      </div>
    </div>
  );
}

export default Portfolio;
