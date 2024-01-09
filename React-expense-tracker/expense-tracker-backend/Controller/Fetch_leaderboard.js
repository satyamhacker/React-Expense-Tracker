const signupData = require("../Models/SignupData");

const fetchLeaderboard = async (req, res) => {

  
  try {
    // Create a new signup data record in the database
    const fetchallitems = await signupData.find({
      
    });
    
        // Respond with the newly created signup data
        res.status(201).json(fetchallitems);
      } catch (error) {
        console.error("Error creating signup data:", error);
        // Handle the error and respond with an error status code
        res.status(500).json({ error: "Internal Server Error" });
      }
}


module.exports = {
    fetchLeaderboard
}