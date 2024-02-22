import React from "react";
import "./LayoutStyle.css";
import myImage from "../images/clean.png";
import HardcodedTable from "./Table.js";
import HardcodedTodoList from "./ToDo";

const Layout = () => {
  return (
    <div className="Layout">
      <main className="Main">
        <div className="Row">
          <div className="Column">
            <div className="ColumnContent">
              <div className="ImageContainer">
                <img src={myImage} alt="Clean" />
              </div>
              <div className="TextContainer">
                <h2>Johnny Clean</h2>
                <p>Student @ Cal Poly</p>
              </div>
            </div>
            <div className="Column">
              <h2>Roomies</h2>
              <p>Lifetime Leaderboard</p>
              <HardcodedTable />
            </div>
          </div>
        </div>
        <div className="Column">
          <h2>To-Do</h2>
          <HardcodedTodoList />
        </div>
      </main>
    </div>
  );
};

export default Layout;
