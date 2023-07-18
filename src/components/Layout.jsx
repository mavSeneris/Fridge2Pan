import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const darkTheme = {
    backgroundColor: isDarkMode &&  "#202225",
    background: isDarkMode && "#202225",
    color: isDarkMode ? "white" : "black",
    transition: "background 0.7s ease",
  };

  const btnDarkTheme = {
    backgroundColor: isDarkMode && "#bd4332",
    transition: "background 0.7s ease",
  };

  return (
    <div style={darkTheme} className="site-wrapper">
      <Header
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        darkTheme={darkTheme}
      />
      <main>
        <Outlet
          context={{ isDarkMode, setIsDarkMode, toggleDarkMode, btnDarkTheme, darkTheme}}
        />
      </main>
    </div>
  );
}
