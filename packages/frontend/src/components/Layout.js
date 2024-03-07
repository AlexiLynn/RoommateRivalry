import React from "react";
import styles from "./LayoutStyle.module.css";
import HardcodedTable from "./Table.js";
import HardcodedTodoList from "./ToDo";
import Profile from "./Profile";

const Layout = () => {
  //api call here with token to check if user is authorized to see home page
  return (
    <div className={styles.Layout}>
      <main className={styles.Main}>
        <div className={styles.Column}>
          <div className={styles.ColumnContent}>
            <Profile />
          </div>
        </div>
        <div className={styles.Column}>
          <h2>To-Do</h2>
          <p style={{ color: "white" }}>spacer</p>
          <HardcodedTodoList />
        </div>
        <div className={styles.Column}>
          <h2>Roomies</h2>
          <p>Weekly Leaderboard</p>
          <HardcodedTable />
        </div>
      </main>
    </div>
  );
};

export default Layout;
