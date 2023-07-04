import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);

  // const activeStyles = {
  //   fontWeight: "bold",
  //   textDecoration: "underline",
  //   textDecorationColor: "#adadff",
  //   color: "#f55742",
  //   backgroundColor: "transparent",
  // };

  const burgerActiveStyles = {
    fontWeight: "bold",
    textDecorationColor: "#adadff",
    color: "#f55742",
    backgroundColor: "transparent",
    background: "rgba(31, 31, 252, 0.219)"
  };

  const handleClick = () => {
    setIsChecked(false);
  };

  return (
    <header>
      {/* <h1 className='main-logo'>Fridge2Pan 🥑</h1> */}
      <h1 className="main-logo">Fridge2Pan 🥦</h1>

      <nav className="nav-menu">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          onClick={handleClick}
        >
          Home
        </NavLink>
        <NavLink
          to="fridge"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          onClick={handleClick}
        >
          Fridge
        </NavLink>
        <NavLink
          to="search-recipes"
          style={({ isActive }) => (isActive ? activeStyles : null)}
          onClick={handleClick}
        >
          Search-Recipes
        </NavLink>
      </nav>





      

      {/* BURGER MENU */}
      <div className="burger-menu">
        <input
          type="checkbox"
          className="burger-toggle"
          id="burger-toggle"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="burger-toggle" className="burger-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="burger-nav">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? burgerActiveStyles : null)}
            onClick={handleClick}
          >
            Home
          </NavLink>
          <NavLink
            to="fridge"
            style={({ isActive }) => (isActive ? burgerActiveStyles : null)}
            onClick={handleClick}
          >
            Fridge
          </NavLink>
          <NavLink
            to="search-recipes"
            style={({ isActive }) => (isActive ? burgerActiveStyles : null)}
            onClick={handleClick}
          >
            Search-Recipes
          </NavLink>
        </div>
      </div>
      {/* --------- */}
    </header>
  );
}
