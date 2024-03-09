// auth.js

//checks if token has been generated (if user has logged in)
export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };
  