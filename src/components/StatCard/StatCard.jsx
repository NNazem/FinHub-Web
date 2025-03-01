import { Card } from "antd";
import { Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

import styles from "./StatCard.module.css";

export default function StatCard({ title, value }) {
  return (
    <Card
      style={{
        width: 250,
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
        margin: "0 0px",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: "16px", color: "#888888" }}>{title}</Text>
        <Title
          level={2}
          style={{
            margin: "0px 0",
            color: value.includes("-") ? "red" : "green",
          }}
        >
          {value}
        </Title>
      </div>
      {/*

              <Text type="success" style={{ fontSize: "14px" }}>
                +20.1% from last month
              </Text>
                */}
    </Card>
  );
}
