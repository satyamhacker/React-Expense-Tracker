const express = require("express");
const app = express();
const signupLogin = require("./Signup_Login");
const addExpense = require("./Add_expense");
const fetchExpenses = require("./Fetch_expenses");
const deleteExpense = require("./Delete_expense");
const updateExpense = require("./Update_expense");
const increaseExpenseAmount = require("./Increase_expense_amount");
const reduceExpenseAmount = require("./Reduce_expense_amount");
const fetchleaderboard = require("./Fetch_leaderboard");

const cors = require("cors");

const port = 3000; // Port number on which your server will run

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON requests
app.use(express.json());

app.post("/signup", signupLogin.signupCreate);
app.post("/login", signupLogin.login);
app.post("/addexpense", addExpense.addExpense);
app.get("/fetchexpenses", fetchExpenses.fetchExpenses);
app.post("/deleteexpense", deleteExpense.deleteExpense);
app.post("/updateexpense", updateExpense.updateExpense);
app.post("/increaseexpenseamount", increaseExpenseAmount.increaseExpenseAmount);
app.post("/reduceexpenseamount", reduceExpenseAmount.reduceExpenseAmount);
app.get("/fetchleaderboard",fetchleaderboard.fetchLeaderboard)


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
