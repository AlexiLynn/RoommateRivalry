import React, { useState } from "react";
import defaultImage from "../images/clean.png";
// import signUp from "./SignUp"
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/signin",
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
        //store token in your application state or cookies?
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
    <div className="signin-container">
      <div className="image-container">
        <img
          src={defaultImage}
          alt="Profile Picture"
          className="profile-image"
        />
      </div>

      <form onSubmit={handleSignIn} className="signin-form">
        <h3 className="signin-heading">Sign In</h3>
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

        <button type="submit">Sign In</button>
        <a href="/signup" className="signup-link">
          Sign Up
        </a>
      </form>
    </div>
  );
};

export default SignIn;
