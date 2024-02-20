import React from "react";
import Navbar from "./components/Navbar";
import "./styles.css";
import Home from "./pages/Home";
import Roommates from "./pages/Roommates";
import Chores from "./pages/Chores";
import Points from "./pages/Points";

function MyApp() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/chores":
      Component = Chores;
      break;
    case "/roommates":
      Component = Roommates;
      break;
    case "/points":
      Component = Points;
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
