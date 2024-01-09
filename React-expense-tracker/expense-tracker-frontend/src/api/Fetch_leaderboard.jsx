import React from "react";
const Base_Url = import.meta.env.VITE_REACT_APP_FRONTEND_BASE_URL;

const Fetch_leaderboard = async () => {
  try {
    // Make a GET request using fetch
    const response = await fetch(Base_Url + "/fetchleaderboard");

    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Fetch error:", error.message);
  }
};

export default Fetch_leaderboard;
