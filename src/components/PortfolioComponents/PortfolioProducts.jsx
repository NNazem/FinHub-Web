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

import styles from "./Portfolio.module.css";
import PortfolioProductsBar from "./PortfolioProductsBar";
import { getUserCoins } from "../../api/api";

export default function PortfolioProducts({products, loading}) {
  const [logos, setLogos] = useState({});
  const [SearchValue, setSearchValue] = useState("");


  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(SearchValue.toLowerCase());
  });

const columns = [
  {
    title: "Logo",
    dataIndex: "coin_market_cap_id",
    render: (coinMarketCapId) => (
      <Avatar
        size={32}
        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinMarketCapId}.png`}
        icon={<UserOutlined />}
      />
    ),
  },
  {
    title: "Name",
    dataIndex : "name",
    sorter : {
      compare: (a,b) => a.name.localeCompare(b.name),
      multiple: 4,
    }
  },
  {
    title: "Entry Price",
    dataIndex: "price",
    sorter: {
      compare: (a, b) => a.price - b.price,
      multiple: 2,
    }
  },
  {
    title: "Current Value",
    dataIndex: "current_price",
    sorter : {
      compare: (a,b) => a.current_price - b.current_price,
      multiple: 1,
    }
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter : {
      compare: (a,b) => a.amount - b.amount,
      multiple: 5,
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
      <PortfolioProductsBar setSearchValue={setSearchValue} searchValue={SearchValue} />
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
