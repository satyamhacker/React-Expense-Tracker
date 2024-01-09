import React, { useEffect, useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import Show_expenses_api from "../api/Show_expenses_api";
import Delete_expense_api from "../api/Delete_expense_api";
import Update_expense_api from "../api/Update_expense_api";
import Reduce_expense_amount_api from "../api/Reduce_expense_amount_api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  makeLogin,
  makePremium,
  totalExpenseAmount,
} from "../redux/counterSlice";

const Show_expenses = () => {
  const [fetchExpenses, setFetchExpenses] = useState([]);
  const [inputBoxValues, setInputBoxValues] = useState({}); // Use an object to store input values for each expense

  const { isLogin, loginEmail, isPremium, totalAmount } = useSelector(
    (state) => state.counter
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      alert("please Login first");
      navigate("/login");
    }

    const fetchExpense = async () => {
      const response = await Show_expenses_api();
      setFetchExpenses(response);
      // Initialize input values for each expense
      const initialValues = {};
      response.forEach((expense) => {
        initialValues[expense._id] = {
          expenseAmount: "",
          expenseDescription: "",
        };
      });
      setInputBoxValues(initialValues);
    };

    fetchExpense();
  }, []);

  const deleteExpense = async (expense) => {
    try {
      //console.log(expense);
      const response = await Delete_expense_api(expense._id);
      const reduceTotalExpenseAmount = await Reduce_expense_amount_api(
        loginEmail,
        expense.expenseAmount
      );
      //console.log("ss", response, reduceTotalExpenseAmount);

      dispatch(totalExpenseAmount(parseInt(-expense.expenseAmount)));

      if (response === true && reduceTotalExpenseAmount === true) {
        alert("Expense deleted successfully");
        setFetchExpenses((prevExpenses) =>
          prevExpenses.filter((exp) => exp._id !== expense._id)
        );
      } else {
        alert("There is a network issue, please try again later");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditOrUpdateExpenseButton = async (expense) => {
    try {
      if (expense.showInputBox) {
        const response = await Update_expense_api(expense._id, {
          expenseAmount: inputBoxValues[expense._id].expenseAmount,
          expenseDescription: inputBoxValues[expense._id].expenseDescription,
        });

        if (response === true) {
          alert("Expense updated successfully");
          setFetchExpenses((prevExpenses) =>
            prevExpenses.map((exp) =>
              exp._id === expense._id
                ? {
                    ...exp,
                    ...inputBoxValues[expense._id],
                    showInputBox: false,
                  }
                : exp
            )
          );
        } else {
          alert("Try again later");
        }
      } else {
        setFetchExpenses((prevExpenses) =>
          prevExpenses.map((exp) =>
            exp._id === expense._id ? { ...exp, showInputBox: true } : exp
          )
        );
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleInputChange = (e, expense) => {
    const { name, value } = e.target;
    setInputBoxValues((prevValues) => ({
      ...prevValues,
      [expense._id]: {
        ...prevValues[expense._id],
        [name]: value,
      },
    }));

    setFetchExpenses((prevExpenses) =>
      prevExpenses.map((exp) =>
        exp._id === expense._id ? { ...exp, showInputBox: true } : exp
      )
    );
  };

  return (
    <div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          {fetchExpenses.map((expense, index) => (
            <React.Fragment key={index}>
              <Modal.Header closeButton>
                <Modal.Title>Expense Category:{expense.category}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Expense Amount:{expense.expenseAmount}</p>
                {expense.showInputBox && (
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Edit expense Amount"
                      name="expenseAmount"
                      value={inputBoxValues[expense._id].expenseAmount}
                      onChange={(e) => handleInputChange(e, expense)}
                    />
                  </InputGroup>
                )}
                <p>Expense Description:{expense.expenseDescription}</p>
                {expense.showInputBox && (
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Edit expense Description"
                      name="expenseDescription"
                      value={inputBoxValues[expense._id].expenseDescription}
                      onChange={(e) => handleInputChange(e, expense)}
                    />
                  </InputGroup>
                )}
                <br />
                <p className="bg-blue-200 border border-4 w-1/3">
                  Your Total Expense Amount:Rs{totalAmount}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="bg-yellow-600"
                  onClick={() => {
                    handleEditOrUpdateExpenseButton(expense);
                  }}
                >
                  {expense.showInputBox ? (
                    <p>Update Expense</p>
                  ) : (
                    <p>Edit Expense</p>
                  )}
                </Button>
                <Button
                  variant="danger"
                  className="bg-red-600"
                  onClick={() => {
                    deleteExpense(expense);
                  }}
                >
                  Delete Expense
                </Button>
              </Modal.Footer>
            </React.Fragment>
          ))}
        </Modal.Dialog>
      </div>
    </div>
  );
};

export default Show_expenses;
