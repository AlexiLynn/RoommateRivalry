import React from "react";
import Navbar from "./components/Navbar";
import "./styles.css";
import Home from "./pages/Home";
import Chores from "./pages/Chores";
import SignUp from "./pages/SignUp";

function MyApp() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = SignUp;
      break;
    case "/home":
      Component = Home;
      break;
    case "/chores":
      Component = Chores;
      break;
  }

  return (
    <>
      {/* check on this after sign up page <Navbar /> */}
      {Component !== SignUp && <Navbar />}
      <Component />
    </>
  );
}

export default MyApp;
