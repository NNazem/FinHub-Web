"use client"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"
import { styled } from "styled-components"
import GlassPanel from "./GlassPanel"
import GlassShine from "../ui/GlassShine"
import GlassReflection from "../ui/GlassReflection"


const NeonAccent = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${(props) => props.color};
  filter: blur(80px);
  opacity: 0.3;
  z-index: 1;
`

const AllocationTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 20;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`

const DetailsLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: #30D158;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    text-decoration: underline;
  }
`

const ChartContainer = styled.div`
  height: 400px;
  position: relative;
  z-index: 20;
  margin-bottom: 16px;
`

const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 24px;
  position: relative;
  z-index: 20;
  justify-content: center;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);

   &:focus {
    outline: none;
  }
`

const ColorIndicator = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const SelectedAssetInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 11px;
  margin-top: 0px;
  text-align: center;
  position: relative;
  z-index: 20;
  box-shadow: 
    inset 0 1px 3px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.05);
`

const SelectedAssetName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
`

const SelectedAssetValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
`

const SelectedAssetPercentage = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
`
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const defaultData = [
  { name: "Bitcoin", value: 12500, color: "#F7931A" },
  { name: "Ethereum", value: 7200, color: "#627EEA" },
  { name: "Cardano", value: 1800, color: "#0033AD" },
  { name: "Solana", value: 1500, color: "#00FFA3" },
  { name: "Polkadot", value: 1200, color: "#E6007A" },
  { name: "Others", value: 480.42, color: "#8A8A8F" },
]

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
      />
    </g>
  )
}

export default function PortfolioPieionChart({
  data = defaultData,
  portfolioValue = 24680.42,
  color = "#30D158", 
}) {

  const [activeIndex, setActiveIndex] = useState(null)

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  const dataWithPercentage = data.map((item) => ({
    ...item,
    percentage: ((item.value / totalValue) * 100).toFixed(1),
  }))

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const selectedAsset = activeIndex !== null ? dataWithPercentage[activeIndex] : null

  return (
      <GlassPanel>
        <GlassShine />
        <GlassReflection />

        <NeonAccent color={color} style={{ top: "30px", left: "30px" }} />
        <NeonAccent color={color} style={{ bottom: "50px", right: "40px" }} />

        <AllocationTitle>
          <span>Portfolio Allocation</span>
          <DetailsLink href="#">
            Details <ArrowIcon />
          </DetailsLink>
        </AllocationTitle>

        <ChartContainer >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={150}
                paddingAngle={3}
                dataKey="value"
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth={1}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                      outline: 'none'
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {!selectedAsset && (<LegendContainer>
          {dataWithPercentage.map((entry, index) => (
            <LegendItem
              key={`legend-${index}`}
              style={{
                cursor: "pointer",
                opacity: activeIndex === null || activeIndex === index ? 1 : 0.6,
                transition: "opacity 0.2s ease",
              }}
            >
              <ColorIndicator color={entry.color} />
              <div>
                <div style={{ fontWeight: 500 }}>{entry.name}</div>
                <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>{entry.percentage}%</div>
              </div>
            </LegendItem>
          ))}
        </LegendContainer>)}
        {selectedAsset && (
          <SelectedAssetInfo>
            <SelectedAssetName>{selectedAsset.name}</SelectedAssetName>
            <SelectedAssetValue>${selectedAsset.value.toLocaleString()}</SelectedAssetValue>
            <SelectedAssetPercentage>{selectedAsset.percentage}% of portfolio</SelectedAssetPercentage>
          </SelectedAssetInfo>
        )}
      </GlassPanel>
  )
}

