import React from "react";
const Base_Url = import.meta.env.VITE_REACT_APP_FRONTEND_BASE_URL;

const Delete_expense_api = async (id) => {
  // console.warn('saaa',reduceStockNumber, MedicineName)
  try {
    const response = await fetch(Base_Url + "/deleteexpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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

export default Delete_expense_api;
