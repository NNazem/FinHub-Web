import React, { useState } from "react";
import { Menu, Avatar, Input, Button, Popover } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./AppHeader.module.css";

const AppHeader = ({activeTab, setActiveTab}) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.header}>
      {/* User Popover */}
      <div className={styles.userMenu}>{/*
        <Popover content={userMenu} trigger="click" placement="bottom">
          <Button type="text" className={styles.userButton}>
            <div class="flex flex-1 items-center gap-2">
              <span class="relative flex h-5 w-5 shrink-0 overflow-hidden rounded-full">
                <img class="aspect-square h-full w-full grayscale" alt="Alicia Koch" src="https://avatar.vercel.sh/personal.png" />
              </span>
              <span class="">Alicia Koch</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="" >
                <path d="m7 15 5 5 5-5">
                </path>
                <path d="m7 9 5-5 5 5">
                </path>
              </svg>
            </div>
          </Button>
        </Popover>*/
        }

        <div className={styles.navMenu}>
          <span
            className={`${styles.navItem} ${activeTab === "Portfolio" ? styles.active : ""}`}
            onClick={() => setActiveTab("Portfolio")}
          >
            Portfolio
          </span>
          <span
            className={`${styles.navItem} ${activeTab === "Insights" ? styles.active : ""}`}
            onClick={() => setActiveTab("Insights")}
          >
            Insights
          </span>
          <span
            className={`${styles.navItem} ${activeTab === "Settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("Settings")}
          >
            Settings
          </span>
        </div>
        </div>

      <Input.Search
        placeholder="Search"
        className={styles.searchBar}
      />

      {/* User Avatar */}
      <Avatar icon={<UserOutlined />} />
    </div>
  );
};

export default AppHeader;