import React, { useState } from "react";
import defaultImage from "../images/clean.png";
import "./LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://roommaterivalry.azurewebsites.net/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Sign-in successful!", responseData.token);
        
        //storing token (and some additional stuff) in localStorage
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);
        localStorage.setItem("householdId", responseData.householdId);
        localStorage.setItem("userName", responseData.userName);

        window.location.pathname = "/home";
      } else {
        console.error("Sign-in failed");
        alert("Incorrect login credentials!");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img
          src={defaultImage}
          alt="Profile Picture"
          className="profile-image"
        />
      </div>

      <form onSubmit={handleLogIn} className="login-form">
        <h3 className="login-heading">Log In</h3>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log In</button>
        <a href="/signup" className="signup-link">
          Sign Up
        </a>
      </form>
    </div>
  );
};

export default LogIn;
