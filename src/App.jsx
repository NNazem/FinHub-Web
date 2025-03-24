import { useState } from 'react'

import AppHeader from './components/Header'
import PortfolioPage from './pages/PortfolioPage';



function App() {

  const [activeTab, setActiveTab] = useState("Portfolio");


  return (
    <>
    <AppHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    {
      activeTab === "Portfolio" && <PortfolioPage />
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
