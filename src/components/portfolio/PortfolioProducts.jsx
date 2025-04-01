import {
  Avatar,
  Card,
  List,
  Typography,
  Row,
  Col,
  Skeleton,
  Table,
  ConfigProvider,
} from "antd";
import React, { useEffect, useState } from "react";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";

import styles from "../../styles/Portfolio.module.css"
import PortfolioProductsBar from "./PortfolioProductsBar";

export default function PortfolioProducts({products, loading, selectedPortfolio}) {
  const [logos, setLogos] = useState({});
  const [SearchValue, setSearchValue] = useState("");


  const filteredProducts = products

  console.log(filteredProducts);

const columns = [
  {
    title: "Logo",
    dataIndex: "Coin",
    render: (coin) => (
      <Avatar
        size={32}
        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin?.id}.png`}
        icon={<UserOutlined />}
      />
    ),
  },
  {
    title: "Name",
    dataIndex : "Coin",
    render: (coin) => coin?.name || "Unknown",
    sorter : {
      compare: (a,b) => a.Coin.name.localeCompare(b.Coin.name),
      multiple: 4,
    }
  },
  {
    title: "Holdings",
    dataIndex: "Amount",
    render: (amount) => amount || "Unknown",
    sorter : {
      compare: (a,b) => a.amount - b.amount,
      multiple: 5,
    }
  },
  {
    title: "Value",
    dataIndex: "Coin",
    render: (coin, record) => {
      if (coin?.quote?.USD?.price) {
        const number = coin?.quote.USD.price * record.Amount
        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

        return formatter.format(number)
      }
      return 0;
    },
    sorter : {
      compare: (a,b) => a.current_price - b.current_price,
      multiple: 1,
    }
  },
  {
    title: "Cost",
    dataIndex: "price",
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 2,
    }
  },
  {
    title: "Profit",
    dataIndex: "current_profit",
    sorter: {
      compare: (a,b) => a.current_profit - b.current_profit,
      multiple: 3,
    },
    render: (text, record) => (
      <span style={{ color: record.current_profit > 0 ? "green" : "red", fontWeight: "bold" }}>
        {text}
      </span>
    )
  }
]

  return (
    <Card
      style={{
        marginTop: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
      }}
    >
      <PortfolioProductsBar setSearchValue={setSearchValue} searchValue={SearchValue} selectedPortfolio={selectedPortfolio} />
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
          dataSource={filteredProducts}
          columns={columns}
          pagination={{ pageSize: 5, size: "extra-sa" }}
          rowKey="symbol"
          loading={loading}
          className={styles.PortfolioProductsTable}
        />
        
      </ConfigProvider>
    </Card>
  );
}
