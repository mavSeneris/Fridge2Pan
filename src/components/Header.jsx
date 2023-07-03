import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

  return (
    <header>
        <nav>
            <NavLink
                to="/"
                style={({ isActive }) => isActive ? activeStyles : null}
            >
                Home
            </NavLink>
            <NavLink
                to="fridge"
                style={({ isActive }) => isActive ? activeStyles : null}
            >
                Fridge
            </NavLink>
        </nav>
    </header>
  )
}
