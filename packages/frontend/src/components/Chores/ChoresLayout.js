// ChoresLayout.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ChoresStyle.module.css";
import Chore from "./Chore";
import { isAuthenticated } from "../auth";

//will have to make sure the new chore that's added to database also reflects
//on mychores and myhouseholdchores columns

const ChoresLayout = () => {
  //checks if user has access to home page
  if (!isAuthenticated()) {
    //redirecting to login if failed
    window.location.pathname = "/";
    return null;
  }
  const [myChores, setMyChores] = useState([]);
  const [myHouseholdChores, setMyHouseholdChores] = useState([]);
  const [newChore, setNewChore] = useState({
    description: "",
    deadline: new Date(),
    points: 0,
    assignee: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChore((prevChore) => ({
      ...prevChore,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setNewChore((prevChore) => ({
      ...prevChore,
      deadline: date
    }));
  };

  const handleAddChore = () => {
    const chore = new Chore(
      newChore.description,
      newChore.deadline,
      newChore.points,
      newChore.assignee
    );

    setMyHouseholdChores((prevChores) => [
      ...prevChores,
      chore
    ]);

    //will have to remove/change this once chores page is completed
    // Filter out chores that match the profile name and add them to My Chores
    if (
      chore.assignee.toLowerCase() ===
      "Johnny Clean".toLowerCase()
    ) {
      setMyChores((prevChores) => [...prevChores, chore]);
    }

    setNewChore({
      description: "",
      deadline: new Date(),
      points: 0,
      assignee: ""
    });
  };

  //to get token, userid, householdId
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const householdId = localStorage.getItem("householdId");


  // Deletes chore after receiving successful DELETE response from backend
  function deleteChore(choreId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    fetch(`https://roommaterivalry.azurewebsites.net/chore/${choreId}`, requestOptions)
      .then((res) => {
        if (res.status === 204) { // Successfully deleted on backend, delete on frontend by id
          setMyChores((prevChores) => prevChores.filter((chore) => chore._id !== choreId));
          setMyHouseholdChores((prevChores) => prevChores.filter((chore) => chore._id !== choreId));
        } else if (res.status === 404) {
          console.log("Resource not found.");
        } else {
          console.log("Error deleting chore:", res.statusText);
        }
      })
      .catch(error => {
        console.error("Error deleting chore:", error);
      });
  }

  //to get user's chores
  useEffect(() => {
    const fetchMyChores = async () => {
      try {
        const response = await fetch(`https://roommaterivalry.azurewebsites.net/chore?user=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setMyChores(data);
        } else {
          console.error("Error fetching chores:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };
  
    fetchMyChores();
  }, [token, userId]);

  //to get entire household's chores
  useEffect(() => {
    const fetchMyHouseholdChores = async () => {
      try {
        const response = await fetch(`https://roommaterivalry.azurewebsites.net/chore?home=${householdId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setMyHouseholdChores(data);
        } else {
          console.error("Error fetching chores:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };
  
    fetchMyHouseholdChores();
  }, [token, householdId]);
  

  return (
    <div className={`${styles.Layout} ${styles.ChoresLayout}`}>
      <main className={styles.Main}>
        <div className={styles.Column}>
          <h2>My Chores</h2>
          <div className={styles.ChoresTable}>
          {myChores.map((chore, index) => (
            <div className={styles.ChoreBox} key={index}>
              <h3>{chore.chore}</h3>
              <div>
                <strong>Deadline:</strong>{" "}
                {new Date(chore.deadline).toLocaleDateString()}
              </div>
              <div>
                <strong>Points:</strong> {chore.points}
              </div>
              <div>
                <strong>Assignee:</strong> {chore.userName}
              </div>
              <button
                type="button"
                onClick={() => deleteChore(chore._id)}
                className={styles.DeleteButton}>
                Delete
              </button>
            </div>
            ))}
          </div>
        </div>
        <div className={styles.Column}>
  <h2>My Household Chores</h2>
  <div className={styles.ChoresTable}>
    {myHouseholdChores.map((chore, index) => (
      <div className={styles.ChoreBox} key={index}>
            <h3>{chore.chore}</h3>
            <div>
              <strong>Deadline:</strong>{" "}
              {new Date(chore.deadline).toLocaleDateString()}
            </div>
            <div>
              <strong>Points:</strong> {chore.points}
            </div>
            <div>
              <strong>Assignee:</strong> {chore.userName}
            </div>
            <button
              type="button"
              onClick={() => deleteChore(chore._id)}
              className={styles.DeleteButton}>
              Delete
            </button>
      </div>
    ))}
  </div>
  </div>
        <div className={styles.Column}>
          <h2>Create New Chore</h2>
          <form>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newChore.description}
              onChange={handleInputChange}
            />

            <label htmlFor="deadline">Deadline:</label>
            <DatePicker
              id="deadline"
              selected={newChore.deadline}
              onChange={handleDateChange}
            />

            <label htmlFor="points">Points:</label>
            <input
              type="number"
              id="points"
              name="points"
              value={newChore.points}
              onChange={handleInputChange}
            />

            <label htmlFor="assignee">Assignee:</label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={newChore.assignee}
              onChange={handleInputChange}
            />

            <button type="button" onClick={handleAddChore}
            className={styles.AddButton}>
              Add Chore
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChoresLayout;

