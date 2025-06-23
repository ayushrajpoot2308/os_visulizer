import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/cpu">🧠 CPU Scheduling</NavLink>
      <NavLink to="/memory">📦 Memory Mgmt</NavLink>
      <NavLink to="/disk">💽 Disk Scheduling</NavLink>
      <NavLink to="/sync">🔐 Synchronization</NavLink>
   </nav>
  );
}

export default Navbar;
