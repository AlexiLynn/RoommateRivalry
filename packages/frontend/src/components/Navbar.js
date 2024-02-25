import React from "react";
export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/home" className="site-title">
        Roommate Rivalry
      </a>
      <ul>
        <li>
          <a href="/chores">Chores</a>
        </li>
        <li>
          <a href="/">Log Out</a>
        </li>
      </ul>
    </nav>
  );
}
