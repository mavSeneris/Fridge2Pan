import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
    console.log(isDarkMode)
  };

  return (
    <div className="site-wrapper">
      
      <Header toggleDarkMode={toggleDarkMode}/> 
      <main>
        <Outlet context={{ isDarkMode, setIsDarkMode, toggleDarkMode }} />
      </main>
    </div>
  );
}
