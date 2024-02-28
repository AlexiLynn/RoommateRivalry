import React from "react";
import Navbar from "./components/Navbar";
import "./styles.css";
import Home from "./pages/Home";
import Chores from "./pages/Chores";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function MyApp() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = SignIn;
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
      {Component !== SignIn && Component !== SignUp && (
        <Navbar />
      )}
      <Component />
    </>
  );
}

export default MyApp;
