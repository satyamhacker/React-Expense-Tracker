const addExpenseSchema = require('../Models/Add_expenses');

const addExpense = async (req, res) => {

  try {
    // Extract data from the request body
    const {
      amountSpent,
      expenseDescription,  
      category,
    } = req.body;

    // Check if required fields are provided
    if (!amountSpent || !expenseDescription || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new medicine data record in the database
    const newMedicineData = await addExpenseSchema.create({
      expenseAmount: amountSpent,
      expenseDescription: expenseDescription,  
      category: category,
     
    });

    // Respond with a success message
    res.status(201).json(true);
  
  } catch (error) {
    console.error("Error creating medicine data:", error);
    // Handle the error and respond with an error status code
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addExpense,
};
