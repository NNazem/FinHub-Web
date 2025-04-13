"use client"
import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { styled } from "styled-components"
import GlassShine from "../ui/GlassShine"
import GlassReflection from "../ui/GlassReflection"
import GlassPanel from "./GlassPanel"
import { getTotalPerPortfolioGroupedByTimestamp } from "../../api/api"

// Default Bitcoin data with real Date objects
const defaultData = [
  { date: new Date(2023, 0, 1), price: 42000 },
  { date: new Date(2023, 0, 15), price: 38000 },
  { date: new Date(2023, 1, 1), price: 44000 },
  { date: new Date(2023, 1, 15), price: 47000 },
  { date: new Date(2023, 2, 1), price: 45000 },
  { date: new Date(2023, 2, 15), price: 50000 },
  { date: new Date(2023, 3, 1), price: 53000 },
  { date: new Date(2023, 3, 15), price: 49000 },
  { date: new Date(2023, 4, 1), price: 51000 },
  { date: new Date(2023, 4, 15), price: 55000 },
]

const defaultColor = "#30D158" // iOS green

const PanelTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 20px;
  letter-spacing: -0.5px;
  position: relative;
  z-index: 20;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`


const ThemeToggle = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(28, 28, 30, 0.3);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  transition: all 0.2s ease;
  z-index: 100;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 1px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.3)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  &:hover {
    background: rgba(44, 44, 46, 0.4);
  }
`

// Colorful glow effects
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

const PriceDisplay = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  position: relative;
  z-index: 20;
`

const CurrentPrice = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-right: 12px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`

const PriceChange = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isPositive ? "#30D158" : "#FF453A")};
  display: flex;
  align-items: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`

const TimeframeSelector = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  position: relative;
  z-index: 20;
  flex-wrap: wrap;
`

// Glass-style buttons
const TimeButton = styled.button`
  background: ${(props) => (props.active ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)")};
  color: ${(props) => (props.active ? "white" : "rgba(255, 255, 255, 0.7)")};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 1px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.2)
    );
    opacity: ${(props) => (props.active ? 1 : 0.5)};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`

// Accent color widget similar to VisionOS
const AccentWidget = styled.div`
  position: absolute;
  top: 20px;
  right: 100px;
  background: ${(props) => props.color};
  color: white;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.2)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

const ChartWrapper = styled.div`
  margin-top: 20px;
  position: relative;
  z-index: 20;
`

export default function LineChart({
  data = defaultData,
  color = defaultColor,
  currencySymbol = "$",
  currencyName = "Bitcoin",
  initialTheme = "dark", 
  totalValue,
  selectedPortfolio
}) {
  const [theme, setTheme] = useState(initialTheme)
  const [activeTimeframe, setActiveTimeframe] = useState("1M")
  const [historicalData, setHistoricalData] = useState([]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    async function fetchHistoricalData() {

      const historicalData = await getTotalPerPortfolioGroupedByTimestamp(
        selectedPortfolio, activeTimeframe
      );
      setHistoricalData(historicalData);
      console.log(historicalData)
    }
    fetchHistoricalData();
  }, [selectedPortfolio, activeTimeframe]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const chartData = data.map((item, index) => ({
    date: item.date,
    price: item.price,
    formattedDate: formatDate(item.date),
    index,
  }))

  // Calculate price change
  const firstPrice = chartData[0]?.price || 0
  const lastPrice = chartData[chartData.length - 1]?.price || 0
  const priceChange = lastPrice - firstPrice
  const priceChangePercent = (priceChange / firstPrice) * 100
  const isPositive = priceChange >= 0

  // VisionOS-inspired color palette
  const themeColors = {
    dark: {
      gradientStart: color,
      gradientStartOpacity: 1,
      gradientEnd: color,
      gradientEndOpacity: 0.0,
      axisStroke: "rgba(174, 174, 178, 0.3)",
      axisTick: "rgba(174, 174, 178, 0.5)",
      tooltipBackground: "rgba(28, 28, 30, 0.7)",
      tooltipBorder: "rgba(44, 44, 46, 0.3)",
      tooltipTextColor: "white",
      tooltipLabelColor: "rgba(255, 255, 255, 0.9)",
    },
    light: {
      gradientStart: color,
      gradientStartOpacity: 0.7,
      gradientEnd: color,
      gradientEndOpacity: 0.05,
      axisStroke: "rgba(174, 174, 178, 0.3)",
      axisTick: "rgba(174, 174, 178, 0.5)",
      tooltipBackground: "rgba(28, 28, 30, 0.7)",
      tooltipBorder: "rgba(44, 44, 46, 0.3)",
      tooltipTextColor: "white",
      tooltipLabelColor: "rgba(255, 255, 255, 0.9)",
    },
  }

  const currentColors = themeColors[theme]

  return (
      <GlassPanel theme={theme}>
        <GlassShine />
        <GlassReflection />

        <NeonAccent color={color} style={{ top: "30px", left: "30px" }} />
        <NeonAccent color={color} style={{ bottom: "50px", right: "40px" }} />

        <PanelTitle theme={theme}>Portfolio Value Chart</PanelTitle>

        <PriceDisplay>
          <CurrentPrice>
            {currencySymbol}
            {totalValue.toLocaleString()}
          </CurrentPrice>
          <PriceChange isPositive={isPositive}>
            {isPositive ? "↑" : "↓"} {Math.abs(priceChange).toLocaleString()} ({Math.abs(priceChangePercent).toFixed(2)}
            %)
          </PriceChange>
        </PriceDisplay>

        <TimeframeSelector>
          <TimeButton active={activeTimeframe === "1D"} onClick={() => setActiveTimeframe("1D")}>
            1D
          </TimeButton>
          <TimeButton active={activeTimeframe === "1W"} onClick={() => setActiveTimeframe("1W")}>
            1W
          </TimeButton>
          <TimeButton active={activeTimeframe === "1M"} onClick={() => setActiveTimeframe("1M")}>
            1M
          </TimeButton>
          <TimeButton active={activeTimeframe === "3M"} onClick={() => setActiveTimeframe("3M")}>
            3M
          </TimeButton>
          <TimeButton active={activeTimeframe === "1Y"} onClick={() => setActiveTimeframe("1Y")}>
            1Y
          </TimeButton>
          <TimeButton active={activeTimeframe === "ALL"} onClick={() => setActiveTimeframe("ALL")}>
            ALL
          </TimeButton>
        </TimeframeSelector>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height={418}>
            <AreaChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: -40 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={currentColors.gradientStart}
                    stopOpacity={currentColors.gradientStartOpacity}
                  />
                  <stop
                    offset="95%"
                    stopColor={currentColors.gradientEnd}
                    stopOpacity={currentColors.gradientEndOpacity}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                stroke={currentColors.axisStroke}
                tick={{ fill: currentColors.axisTick }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(entry) => {
                  const dataPoint = new Date(entry);
                  if (dataPoint) {
                    return dataPoint.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  return entry
                }}
              />
              <YAxis
                stroke={currentColors.axisStroke}
                domain={["dataMin - 1000", "dataMax + 1000"]}
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <Tooltip
                contentStyle={{
                  background: currentColors.tooltipBackground,
                  backdropFilter: "blur(70px)",
                  border: `1px solid ${currentColors.tooltipBorder}`,
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  color: currentColors.tooltipTextColor,
                }}
                labelStyle={{ color: currentColors.tooltipLabelColor }}
                labelFormatter={(entry) => {
                  // Get the original date from the data point
                  const dataPoint = new Date(entry);
                  if (dataPoint) {
                    return dataPoint.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                  return entry
                }}
                formatter={(value) => [`${currencySymbol}${value.toLocaleString()}`, "Portfolio Value"]}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke={color}
                strokeWidth={3}
                dot={{
                  stroke: color,
                  strokeWidth: 2,
                  r: 0,
                  fill: "rgba(255, 255, 255, 0.8)",
                }}
                activeDot={{
                  r: 8,
                  stroke: color,
                  strokeWidth: 2,
                  fill: "rgba(255, 255, 255, 0.9)",
                }}
                fill="url(#colorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </GlassPanel>
  )
}

