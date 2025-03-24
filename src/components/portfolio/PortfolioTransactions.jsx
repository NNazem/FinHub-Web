import { Card, ConfigProvider, Table } from "antd";
import React from "react";
import PortfolioTransactionsBar from "./PortfolioTransactionsBar";
import styles from "../../styles/Portfolio.module.css"

export default function PortfolioTransactions({ products, loading }) {
  const columns = [
    {
      title: "Coin",
      dataIndex: "coin",
      key: "coin",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const data = products?.map((product) => {
    return {
      key: product.id,
      coin: product.coin,
      amount: product.amount,
      price: product.price,
      total: product.total,
      date: product.date,
    };
  });

  return (
    <Card
      style={{
        marginTop: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
      }}
    >
      <PortfolioTransactionsBar />
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "transparent",
            },
          },
        }}
      >
        <Table
          className={styles.PortfolioProductsTable}
          pagination={{ pageSize: 5, size: "extra-sa" }}
        />
      </ConfigProvider>
    </Card>
  );
}
