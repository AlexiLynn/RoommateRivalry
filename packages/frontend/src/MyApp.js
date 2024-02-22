import React from "react";
import Navbar from "./components/Navbar";
import "./styles.css";
import Home from "./pages/Home";
import Chores from "./pages/Chores";

function MyApp() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/chores":
      Component = Chores;
      break;
  }

  return (
    <>
      <Navbar />
      <Component />
    </>
  );
}

export default MyApp;
