import React from "react";
import "./LayoutStyle.css";
import myImage from "../images/clean.png";
import HardcodedTable from "./Table.js";
import HardcodedTodoList from "./ToDo";
import Profile from "./Profile";

const Layout = () => {
  return (
    <div className="Layout">
      <main className="Main">
        <div className="Column">
          <div className="ColumnContent">
            <div className="ImageContainer">
              <img src={myImage} alt="Clean" />
            </div>
            <Profile />
          </div>
        </div>
        <div className="Column">
          <h2>To-Do</h2>
          <HardcodedTodoList />
        </div>
        <div className="Column">
          <h2>Roomies</h2>
          <p>Lifetime Leaderboard</p>
          <HardcodedTable />
        </div>
      </main>
    </div>
  );
};

export default Layout;
