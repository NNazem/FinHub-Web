import React from "react";

import styles from "./Portfolio.module.css";
import StatCard from "../StatCard/StatCard";
export default function PortfolioHeader() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "Geist Sans, sans-serif",
          margin: "15px 0",
          fontSize: "30px",
          fontWeight: "bold",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        Tracker
      </h1>
      
    </div>
  );
}

