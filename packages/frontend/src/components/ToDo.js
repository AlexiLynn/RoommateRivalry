import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [myChores, setMyChores] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMyChores = async () => {
      try {
        const response = await fetch(`https://roommaterivalry.azurewebsites.net/chore?user=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  //update user points, delete chore
  const handleToggleComplete = async (_id) => {
    try {
      const response = await fetch(`https://roommaterivalry.azurewebsites.net/complete-chore/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMyChores((prevChores) =>
          prevChores.map((chore) =>
            chore._id === _id ? { ...chore, completed: !chore.completed } : chore
          )
        );
      } else {
        console.error("Error completing chore:", response.statusText);
      }
    } catch (error) {
      console.error("Error completing chore:", error);
    }
  };

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Chore</th>
            <th>Points</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {myChores.map((chore) => (
            <tr key={chore._id} style={{ textDecoration: chore.completed ? "line-through" : "none" }}>
              <td>{chore.chore}</td>
              <td>{chore.points}</td>
              <td>
                <input
                  type="checkbox"
                  checked={chore.completed}
                  onChange={() => handleToggleComplete(chore._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
