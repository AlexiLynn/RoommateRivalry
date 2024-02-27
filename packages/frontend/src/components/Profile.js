import React, { useState } from "react";
import defaultImage from "../images/clean.png";
import "./ProfileStyle.css";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("Johnny Clean");
  const [description, setDescription] = useState(
    "Student @ Cal Poly"
  );
  const [image, setImage] = useState(defaultImage); //for image

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="Profile">
      {editMode ? (
        <>
          <div>
            <label htmlFor="image">Profile Image:</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
            />
          </div>
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
          <div className="ProfileInfo">
            <div className="ImageContainer">
              <img
                src={image}
                alt="Profile"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  width: "auto",
                  height: "auto"
                }}
              />
            </div>
            <div className="TextContainer">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </div>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Profile;
