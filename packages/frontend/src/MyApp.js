import React from "react";
import Navbar from "./components/Navbar";
import "./styles.css";
import Home from "./pages/Home";
import Chores from "./pages/Chores";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function MyApp() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = LogIn;
      break;
    case "/signup":
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
      {Component !== LogIn && Component !== SignUp && (
        <Navbar />
      )}
      <Component />
    </>
  );
}

export default MyApp;
