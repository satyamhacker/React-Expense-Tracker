const addExpense = require('../Models/Add_expenses');

const updateExpense = async (req, res) => {
  const { id, updatedExpense} = req.body;

  console.log('data came from frontend==>', id, updatedExpense)

  try {
    // Find the medicine in the database
    const foundExpense = await addExpense.findOne({
      _id:id,
    });

    //console.log('test', foundExpense)

    if (foundExpense) {
      // Medicine found, update its location
      foundExpense.expenseAmount = updatedExpense.expenseAmount;
      foundExpense.expenseDescription= updatedExpense.expenseDescription;

      // Save the changes to the database
      await foundExpense.save();

      //console.log('Medicine location updated successfully.');

      res.status(201).json(true);
    } else {
      console.log('Medicine not found in the database.');
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    console.error('Error updating medicine location:', error);
    // Handle the error and respond with an error status code
    res.status(500).json({ error: 'Internal Server Error' });
  }




};

module.exports = {
  updateExpense
};
