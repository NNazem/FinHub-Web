import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import GlassPanel from "../portfolio/GlassPanel";
import GlassShine from "../ui/GlassShine";
import GlassReflection from "../ui/GlassReflection";
import styled from "styled-components";
import { Plus } from "lucide-react";


export default function PortfolioNavbar({ portfolios, setSelectedPortfolio, loading }) {

    const [selected, isSelected] = useState("")

    if (loading) {
        return <div>Loading...</div>
    }

    console.log(portfolios)

    return (
        <div>
            <GlassPanel style={{
                display: "flex", 
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "1rem"
            }}>
                <GlassShine />
                <GlassReflection />
                <nav style={{
                    display: "flex",
                }}>
                    <ul style={{
                        display: "flex", 
                        flexDirection: "row",
                        padding: 0, 
                        margin: 0 
                    }}>
                        {portfolios.map((item) => {
                            return (
                                <li style={{
                                    display: "flex", 
                                }}>
                                    <button className={`w-full flex items-center space-x-2 p-2 rounded-lg ${selected === item.label ? " bg-white/10 text-white" : " text-white/70 hover:bg-white/5"}`} >
                                        <span style={{color: "white", whiteSpace: "nowrap"}}>{item.label}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <button className="flex items-center space-x-2 p-2 rounded-lg bg-white/10 text-white">
                    <Plus className="w-5 h-5"/>
                    <span>Create portfolio</span>
                </button>
            </GlassPanel>
        </div>
    );
}
