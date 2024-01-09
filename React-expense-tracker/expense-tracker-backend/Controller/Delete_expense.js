const allExpenses = require("../Models/Add_expenses");


const deleteExpense = async (req, res) => {
    const { id } = req.body;
  
    try {
      // Use the findOneAndDelete method to delete a document based on a condition
      const deleteMedicineRequest = await allExpenses.findOneAndDelete({
        _id:id
      });
  
      // Check if a document was deleted
      if (deleteMedicineRequest) {
        res.status(201).json(true);
      } else {
        res.status(404).json(false);
      }
  
    } catch (error) {
      console.error('Error deleting medicine:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


module.exports = {
  deleteExpense,
};