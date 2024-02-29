import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    //UNCOMMENT AT END: TO CHECK THAT ALL FIELDS ARE ENTERED
    // if (!name || !email || !phone || !password || !confirmPassword || !groupName) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      name,
      email,
      phone,
      password,
      confirmPassword,
      groupName
    });

    window.location.pathname = "/home";
  };

  return (
    <div className="signup-container">
      <a href="/" className="back-link">
        Back
      </a>
      <form onSubmit={handleSignUp} className="signup-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
