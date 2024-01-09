const mongoose = require('mongoose');

// Define the AddExpenses schema
const AddExpensesSchema = new mongoose.Schema({
  expenseAmount: {
    type: Number,
    required: true,
    trim: true,
  },
  expenseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  // You can include other fields relevant to user AddExpenses here
});

// Create the AddExpenses model
const AddExpenses = mongoose.model('Expenses', AddExpensesSchema);

module.exports = AddExpenses;
