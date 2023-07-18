import React from "react";
import { useOutletContext } from "react-router-dom";

const MyComponent = () => {
  const { isDarkMode, toggleDarkMode } = useOutletContext();

  return (
    <div className="test">
      <button onClick={toggleDarkMode}>{!isDarkMode ? "Light Mode" : "Dark Mode"}</button>
      <div className={isDarkMode ? "dark" : "light"}>
        <h1>this is a test page</h1>
      </div>
    </div>
  );
};

export default MyComponent;
