import React from "react";

import styles from "./Portfolio.module.css";
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
