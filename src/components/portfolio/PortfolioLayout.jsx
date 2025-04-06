import React, { useEffect, useState } from "react";

import ProductTable from "./ProductsTable";
import TransactionsTable from "./TransactionsTable";
import { getCryptoPerPortfolio, getTotalPerPortfolio } from "../../api/api";
import PortfolioCharts from "./PortfolioCharts";
import styled from "styled-components";


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
      <ProductTable products={products} loading={loading} selectedPortfolio={selectedPortfolio} />
      <TransactionsTable />
    </div>
  );
}
