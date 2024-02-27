import React from "react";
import styles from "./LayoutStyle.module.css";
import HardcodedTable from "./Table.js";
import HardcodedTodoList from "./ToDo";
import Profile from "./Profile";

const Layout = () => {
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
          <HardcodedTodoList />
        </div>
        <div className={styles.Column}>
          <h2>Roomies</h2>
          <p>
            Weekly{" "}
            <a
              href="/points"
              className={styles.Link}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderBottom =
                  "1px solid black")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderBottom =
                  "1px solid transparent")
              }
            >
              Leaderboard
            </a>
          </p>
          <HardcodedTable />
        </div>
      </main>
    </div>
  );
};

export default Layout;
