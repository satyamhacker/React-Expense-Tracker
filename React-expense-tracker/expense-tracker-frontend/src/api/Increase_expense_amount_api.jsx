const Base_Url = import.meta.env.VITE_REACT_APP_FRONTEND_BASE_URL;

const Increase_expense_amount_api = async (loginEmail, expenseAmount) => {
  console.log("test", loginEmail, expenseAmount);

  try {
    const response = await fetch(Base_Url + "/increaseexpenseamount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginEmail, expenseAmount }),
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

export default Increase_expense_amount_api;
