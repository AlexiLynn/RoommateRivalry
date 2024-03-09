// ChoresLayout.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ChoresStyle.module.css";

const token = localStorage.getItem("token");
const currUserId = localStorage.getItem("userId");
// TODO: const currHouseholdId = localStorage.getItem("householdId");

const uri = "https://roommaterivalry.azurewebsites.net"
// const uri = "https://localhost:8000" // using for testing

const ChoresLayout = () => {
  const [myHouseholdId, setMyHouseholdId] = useState([]); // TODO: Remove once localStorage is working above
  const [myChores, setMyChores] = useState([]);
  const [myHouseholdChores, setMyHouseholdChores] = useState([]);
  const [newChore, setNewChore] = useState({
    description: "",
    deadline: new Date(),
    points: 0,
    assignee: "",
    householdId: myHouseholdId, // TODO: currHouseholdId,
    userId: currUserId,
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
      deadline: new Date(date)
    }));
  };

//  const handleAddChore = () => {
//    const chore = new Chore(
//      newChore.description,
//      newChore.deadline,
//      newChore.points,
//      newChore.assignee
//    );
//
//    setMyHouseholdChores((prevChores) => [
//      ...prevChores,
//      chore
//    ]);
//
//    // Filter out chores that match the profile name and add them to My Chores
//    if (
//      chore.assignee.toLowerCase() ===
//      "Johnny Clean".toLowerCase()
//    ) {
//      setMyChores((prevChores) => [...prevChores, chore]);
//    }
//
//    setNewChore({
//      description: "",
//      deadline: new Date(),
//      points: 0,
//      assignee: ""
//    });
//  };

  // Helper function to addChore(), sends POST request to add chore to backend
  function postChore(chore) {
    const promise = fetch('${uri}/chore', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(chore),
    });
    return promise;
  }

  // Adds chore to frontend after receiving successful POST response from backend
  async function addChore() {
    try {
      const householdId = await fetchMyHouseholdId()// await getHouseholdId(); // Fetch householdId from the backend

      if (!householdId) {
        console.error("Household ID not found for the user.");
        // You can handle this case in your UI if needed
        return;
      }

      const choreToAdd = {
        description: newChore.description,
        deadline: newChore.deadline,
        points: newChore.points,
        assignee: newChore.assignee,
        householdId: householdId, // TODO: currHouseholdId,
        userId: currUserId,
      };

      const response = await postChore(choreToAdd);

      if (response.status === 201) {
        const newChore = await response.json();
        setMyHouseholdChores((prevChores) => [...prevChores, newChore]);
        // TODO: Update myChores here if needed
        setNewChore({
          description: "",
          deadline: new Date(),
          points: 0,
          assignee: "",
          householdId: householdId, // TODO: currHouseholdId,
          userId: currUserId
        });
      } else {
        throw new Error("Chore not added successfully");
      }
    } catch (error) {
      console.error("Error adding chore:", error);
    }
  }

//  async function getHouseholdId() {
//    try {
//      const response = await fetch(`https://roommaterivalry.azurewebsites.net/user/${currUserId}/householdId`, {
//        method: "GET",
//        headers: {
//          "Content-Type": "application/json",
//          "Authorization": `Bearer ${token}`,
//        },
//      });
//
//      if (response.ok) {
//        const data = await response.json();
//        return data.householdId;
//      } else {
//        throw new Error("Failed to fetch householdId");
//      }
//    } catch (error) {
//      console.error("Error fetching householdId:", error);
//      throw error;
//    }
//  }

// Not working yet :'(
  async function fetchMyHouseholdId() {
    try {
      const response = await fetch('${uri}/user/${currUserId}', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Fetched user data: ", user);
        setMyHouseholdId(user.householdId);
      } else {
        console.error("Error fetching user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

// This fetches all household chores just once (the first time this page is loaded), and
// Initializes frontend "household_chores" to reflect data in db
//  useEffect(() => {
//    fetchChores()
//      .then((res) => res.json())
//      .then((json) => {
//        setMyHouseholdChores(json["household_chores"]);
//        setMyChores(json["household_chores"].filter((chore) => chore.assignee.toLowerCase() === "Johnny Clean".toLowerCase()));
//      })
//      .catch((error) => { console.log(error); });
//  }, [] );

  useEffect(() => {
    const fetchMyChores = async () => {
      try {
        const response = await fetch(`${uri}/user/${currUserId}/chores`, {
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
  }, [token, currUserId]); // Include token and userId in the dependency array

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

            <button type="button" onClick={addChore}>
              Add Chore
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChoresLayout;

