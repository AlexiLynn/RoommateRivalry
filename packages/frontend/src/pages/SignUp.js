import React, { useState } from "react";
import "./SignUp.css";

//HAVE TO ADD BACK -> TO GO TO LOGIN PAGE

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [groupNumber, setGroupNumber] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    //UNCOMMENT LATER
    // if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !groupNumber) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      groupNumber,
    });

    window.location.pathname = "/home";
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form">
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          Group Number:
          <input
            type="text"
            value={groupNumber}
            onChange={(e) => setGroupNumber(e.target.value)}
          />
        </label>

        <button type="submit">
            Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
