import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import GlassPanel from "../portfolio/GlassPanel";
import GlassShine from "../ui/GlassShine";
import GlassReflection from "../ui/GlassReflection";
import { AreaChartIcon, LayoutGridIcon, PieChartIcon, SettingsIcon, WalletIcon } from "lucide-react";

export default function Navbar() {

    return (
        <div>
            <GlassPanel style={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem"
            }}>
                <GlassShine />
                <GlassReflection />
                <nav style={{
                    display: "flex",
                    width: "100%" 
                }}>
                    <ul className="space-y-1">
                        <li>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 text-white">
                            <LayoutGridIcon className="w-5 h-5" />
                            <span>Dashboard</span>
                        </button>
                        </li>
                        <li>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:bg-white/5">
                            <WalletIcon className="w-5 h-5" />
                            <span>Portfolio</span>
                        </button>
                        </li>
                        <li>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:bg-white/5">
                            <AreaChartIcon className="w-5 h-5" />
                            <span>Markets</span>
                        </button>
                        </li>
                        <li>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:bg-white/5">
                            <PieChartIcon className="w-5 h-5" />
                            <span>Analytics</span>
                        </button>
                        </li>
                        <li>
                        <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-white/70 hover:bg-white/5">
                            <SettingsIcon className="w-5 h-5" />
                            <span>Settings</span>
                        </button>
                        </li>
                    </ul>
                </nav>
            </GlassPanel>
        </div>
    );
}
