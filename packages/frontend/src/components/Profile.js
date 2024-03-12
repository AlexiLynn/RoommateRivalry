import React, { useState, useEffect } from "react";
import defaultImage from "../images/clean.png";
import "./ProfileStyle.css";

const Profile = ({ token, userId }) => {
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

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;

 return (
   <div className="Profile">
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
   </div>
 );
};

export default Profile;