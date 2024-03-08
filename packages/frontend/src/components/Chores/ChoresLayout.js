// ChoresLayout.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ChoresStyle.module.css";
import Chore from "./Chore";

const ChoresLayout = () => {
  const [myChores, setMyChores] = useState([]);
  const [myHouseholdChores, setMyHouseholdChores] = useState(
    []
  );
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

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMyChores = async () => {
      try {
        const response = await fetch(`https://roommaterivalry.azurewebsites.net/user/${userId}/chores`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log("chores listing it in the api call lol",data);
          setMyChores(data);
        } else {
          console.error("Error fetching chores:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };
  
    fetchMyChores();
  }, [token, userId]); // Include token and userId in the dependency array

  return (
    <div className={styles.Layout}>
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
      <strong>Assignee:</strong> {chore.user.name}
    </div>
  </div>
))}

          </div>
        </div>
        <div className={styles.Column}>
          <h2>My Household Chores</h2>
          <div className={styles.ChoresTable}>
            {myHouseholdChores.map((chore, index) => (
              <div className={styles.ChoreBox} key={index}>
                <h3>{chore.description}</h3>
                <div>
                  <strong>Deadline:</strong>{" "}
                  {chore.deadline.toLocaleDateString()}
                </div>
                <div>
                  <strong>Points:</strong> {chore.points}
                </div>
                <div>
                  <strong>Assignee:</strong> {chore.assignee}
                </div>
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

            <button type="button" onClick={handleAddChore}>
              Add Chore
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChoresLayout;

