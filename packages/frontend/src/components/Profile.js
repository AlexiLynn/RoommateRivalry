import React, { useState, useEffect } from "react";
import defaultImage from "../images/clean.png";
import "./ProfileStyle.css";

const Profile = ({ token, userId }) => {
 const [editMode, setEditMode] = useState(false);
 const [user, setUser] = useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');

 useEffect(() => {
   const fetchUserById = async () => {
     setLoading(true);
     setError('');
     try {
       const response = await fetch(`https://roommaterivalry.azurewebsites.net/user/${userId}`, {
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
         image: defaultImage
       });
       
     } catch (error) {
       console.error('Error fetching user:', error.message);
       setError('Error fetching user');
     } finally {
       setLoading(false);
     }
   };
   fetchUserById();
 }, [userId, token]);

 const handleEditClick = () => {
   setEditMode(true);
 };

 const handleSaveClick = () => {
   setEditMode(false);
   // Logic to update the user's name on the server would go here
 };

 const handleNameChange = (e) => {
   setUser({ ...user, name: e.target.value });
 };

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;

 return (
   <div className="Profile">
     {editMode ? (
       <div>
         <label htmlFor="name">Name:</label>
         <input
           type="text"
           id="name"
           value={user.name}
           onChange={handleNameChange}
         />
         <button onClick={handleSaveClick}>Save</button>
       </div>
     ) : (
       <>
         <div className="ProfileInfo">
           <div className="ImageContainer">
             <img
               src={user.image}
               alt="Profile"
               style={{ maxWidth: "150px", maxHeight: "150px", width: "auto", height: "auto" }}
             />
           </div>
           <div className="TextContainer">
             <h2>{user.name}</h2>
           </div>
         </div>
         <button onClick={handleEditClick}>Edit</button>
       </>
     )}
   </div>
 );
};

export default Profile;