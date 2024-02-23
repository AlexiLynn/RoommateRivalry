import React, { useState } from "react";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("Johnny Clean");
  const [description, setDescription] = useState(
    "Student @ Cal Poly"
  );

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // You can perform any additional actions here, such as updating data on the server.
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="Profile">
      {editMode ? (
        <>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="description">Bio:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <h2>{name}</h2>
          <p>{description}</p>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Profile;
