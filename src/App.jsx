import { useState } from 'react'

import AppHeader from './components/Header'
import PortfolioPage from './pages/PortfolioPage';

import './index.css'
import Navbar from './components/layout/Navbar';
import styled from 'styled-components';

const DemoContainer = styled.div`
  background: rgb(6,68,1);
  background: radial-gradient(circle, rgba(6,68,1,1) 0%, rgba(0,0,0,1) 100%);
  padding: 24px;
  min-height: 600px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Text', 'Helvetica Neue', sans-serif;
  position: relative;
  overflow: hidden;
`

function App() {

  const [activeTab, setActiveTab] = useState("Portfolio");


  return (
    <DemoContainer style={{display:"flex", flexDirection: "row", gap: "16px"}}>
      <Navbar />
      <div  style={{display:"flex", flexDirection: "column", width: "100%"}}>
        {
          activeTab === "Portfolio" && <PortfolioPage />
        }
        {
          activeTab === "Insights" && <h1>Insights</h1>
        }
        {
          activeTab === "Settings" && <h1>Settings</h1>
        }
      </div>
    </DemoContainer>
  )
}

export default App
