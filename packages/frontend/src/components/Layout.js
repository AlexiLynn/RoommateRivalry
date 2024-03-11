import React from "react";
import styles from "./LayoutStyle.module.css";
import UsersTable from "./Table.js";
import TodoList from "./ToDo";
import Profile from "./Profile";
import { isAuthenticated } from "./auth";

const Layout = () => {
  const token = localStorage.getItem("token");
  const householdId = localStorage.getItem("householdId");
  //checks if user has access to home page
  if (!isAuthenticated()) {
    //redirecting to login if failed
    window.location.pathname = "/";
    return null;
  }

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
          <TodoList />
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
