import React from "react";

import styles from "./Portfolio.module.css";

export default function PortfolioPieChartLegend() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom: "25px",
        marginTop: "-25px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#00E4FF",
              borderRadius: "50%",
            }}
          ></div>
          <span style={{ whiteSpace: "nowrap" }}>Conti</span>{" "}
          {/* Evita il wrapping del testo */}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#FFD700",
              borderRadius: "50%",
            }}
          ></div>
          <span style={{ whiteSpace: "nowrap" }}>Investimenti</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#FF69B4",
              borderRadius: "50%",
            }}
          ></div>
          <span style={{ whiteSpace: "nowrap" }}>Spese</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#9370DB",
              borderRadius: "50%",
            }}
          ></div>
          <span style={{ whiteSpace: "nowrap" }}>Altro</span>
        </div>
      </div>
    </div>
  );
}
