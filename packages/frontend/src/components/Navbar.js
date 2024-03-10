import React from "react";

const Navbar = () => {
  const handleLogout = async () => {
    //invalidating the token
    await fetch("https://roommaterivalry.azurewebsites.net/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("householdId");
    window.location.pathname = "/";
  };

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
          <button
            onClick={handleLogout}
            //css stuff here makes the button look like a link
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0",
              font: "inherit",
              textDecoration: "none",
              marginBottom: "-5px",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline", e.target.style.color = "#0346a2")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none", e.target.style.color = "white")}
          >
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

//add the css stuff to separate file if possible?
