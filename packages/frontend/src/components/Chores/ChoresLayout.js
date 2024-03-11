// ChoresLayout.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ChoresStyle.module.css";
import { isAuthenticated } from "../auth";

const ChoresLayout = () => {
  //checks if user has access to home page
  if (!isAuthenticated()) {
    //redirecting to login if failed
    window.location.pathname = "/";
    return null;
  }

  //to get token, userId, householdId, userName
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const householdId = localStorage.getItem("householdId");

  // To toggle btwn local and deployed state
  const uri = "https://roommaterivalry.azurewebsites.net"
  // const uri = "http://localhost:8000"
  
  const [user, setUser] = useState([]);
  const [myChores, setMyChores] = useState([]);
  const [myHouseholdChores, setMyHouseholdChores] = useState([]);
  const [newChore, setNewChore] = useState({
    description: "",
    deadline: new Date(),
    points: 0
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

  const addChore = async () => {
    const choreToAdd = {
      chore: newChore.description,
      completed: false,
      deadline: newChore.deadline,
      points: newChore.points,
      householdId: user.householdId,
      userId: userId,
      userName: user.name
    };

    try {
      const response = await fetch(`${uri}/chore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(choreToAdd),
      });
      console.log("POST response: ", response);

      if (response.ok) {
        setMyHouseholdChores((prevChores) => [...prevChores, choreToAdd]);
        setMyChores((prevChores) => [...prevChores, choreToAdd]);
        setNewChore({
          description: "",
          deadline: new Date(),
          points: 0
        });
      } else {
        throw new Error("Chore not added successfully");
      }
    } catch (error) {
      // TODO: Remove these lines once the front to backend is working - this ONLY updates the frontend for demo purposes
      setMyHouseholdChores((prevChores) => [...prevChores, choreToAdd]);
      setMyChores((prevChores) => [...prevChores, choreToAdd]);
      setNewChore({
        description: "",
        deadline: new Date(),
        points: 0
      });

      console.error("Error adding chore:", error);
    }
  };

  // Deletes chore after receiving successful DELETE response from backend
  function deleteChore(choreId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    fetch(`${uri}/chore/${choreId}`, requestOptions)
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

  // To get user information
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await fetch(`${uri}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
 
        const userData = await response.json();
 
        setUser({
          name: userData.name || "No name provided",
          householdId: userData.householdId || "No household id provided"
        });
        
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };
    fetchUserById();
  }, [userId, token]);

  //to get user's chores
  useEffect(() => {
    const fetchMyChores = async () => {
      try {
        const response = await fetch(`${uri}/chore?user=${userId}`, {
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
        const response = await fetch(`${uri}/chore?home=${householdId}`, {
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
    <div className={'${styles.Layout} ${styles.ChoresLayout}'}>
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

            <button type="button" onClick={addChore}
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

