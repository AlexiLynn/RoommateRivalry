import React from "react";
import styles from "./LayoutStyle.module.css";
import UsersTable from "./Table.js";
import HardcodedTodoList from "./ToDo";
import Profile from "./Profile";

const Layout = () => {
  const token = localStorage.getItem("token");
  const householdId = "65e93b29d9f311f834219bed"
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
          <UsersTable token={token} householdId={householdId} />  
        </div>
      </main>
    </div>
  );
};

export default Layout;
