import React from "react";
const Base_Url = import.meta.env.VITE_REACT_APP_FRONTEND_BASE_URL;

const Update_expense_api = async (id, updatedExpense) => {
  console.log("test", id, updatedExpense);
  try {
    const response = await fetch(Base_Url + "/updateexpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        updatedExpense,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to post data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default Update_expense_api;
