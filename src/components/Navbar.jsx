import { Menu } from "antd";
import React, { useEffect } from "react";


export default function Navbar({ portfolios, setSelectedPortfolio, loading }) {

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(portfolios[0].key)

return (
    <Menu
        mode="inline"
        items={portfolios}
        style={{ 
            display: "flex", 
            flexDirection: "column", 
            width: "150px", 
            padding: "0",
        }}
        inlineIndent={16}
        defaultSelectedKeys={[`${portfolios[0]?.key}`]}
        onClick={(e) => setSelectedPortfolio(e.key)}
    />
);
}
