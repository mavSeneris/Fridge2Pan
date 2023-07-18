import React from "react";
import { useOutletContext } from "react-router-dom";
import { DarkModeContext } from "../context/themeContext";

const MyComponent = () => {
  const { isDarkMode, toggleDarkMode } = useOutletContext();

  return (
    <div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <div className={isDarkMode ? "dark" : "light"}>
        <h1>this is a test page</h1>
      </div>
    </div>
  );
};

export default MyComponent;
