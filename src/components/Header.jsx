import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    textDecorationColor: "#adadff",
    color: "#f55742",
    backgroundColor: "transparent",
  };

  return (
    <header>
      {/* <h1 className='main-logo'>Fridge2Pan 🥑</h1> */}
      <h1 className="main-logo">Fridge2Pan 🥦</h1>

      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>
        <NavLink
          to="fridge"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Fridge
        </NavLink>
        <NavLink
          to="search-recipes"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Search-Recipes
        </NavLink>
      </nav>
    </header>
  );
}
