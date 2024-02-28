import React, { useState } from "react";
import defaultImage from "../images/clean.png";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    // UNCOMMENT AT END: TO CHECK THAT ALL FIELDS ARE ENTERED
    // if (!email || !password) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    //api call here
    console.log({
      email,
      password
    });

    window.location.pathname = "/home";
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
