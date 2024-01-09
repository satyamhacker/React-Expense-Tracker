import React from "react";
import Login from "./signup_login/Login";
import Signup from "./signup_login/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add_expenses from "./Expense_related/Add_expenses";
import Show_expenses from "./Expense_related/Show_expenses";
import Show_leaderboard from "./Expense_related/Show_leaderboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/showleaderboard" element={<Show_leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addexpenses" element={<Add_expenses />} />
        <Route path="/showexpenses" element={<Show_expenses />} />

        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
