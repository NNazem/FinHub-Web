import { useState } from 'react'
import { Table, ConfigProvider } from "antd";

import AppHeader from './components/Header'
import Portfolio from './components/PortfolioComponents/Portfolio';



function App() {

  const [activeTab, setActiveTab] = useState("Portfolio");


  return (
    <>
    <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    {
      activeTab === "Portfolio" && <Portfolio />
    }
    {
      activeTab === "Insights" && <h1>Insights</h1>
    }
    {
      activeTab === "Settings" && <h1>Settings</h1>
    }
    </>
  )
}

export default App
