const SignupData = require("../Models/SignupData");

const reduceExpenseAmount = async (req, res) => {
  try {
    // Extract data from the request body
    const { loginEmail, expenseAmount } = req.body;

    const user = await SignupData.findOne({ email: loginEmail });

    if (user.totalExpense > 0) {
      // Medicine found, update its location
      user.totalExpense = user.totalExpense - parseInt(expenseAmount);
      // Save the changes to the database
      await user.save();

      res.status(201).json(true);
    } else {
      res
        .status(500)
        .json({
          error: "your Total Expense Amount is zero please Add some Expenses",
        });
    }
  } catch (error) {
    console.error("Error checking login data:", error);
    // Handle the error and respond with an error status code
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  reduceExpenseAmount,
};
