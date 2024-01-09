import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Toast, Dropdown, Navbar, Nav } from "react-bootstrap";
import Add_expenses_api from "../api/Add_expenses_api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  makeLogin,
  makePremium,
  totalExpenseAmount,
} from "../redux/counterSlice";
import Increase_expense_amount_api from "../api/Increase_expense_amount_api";

import Show_expenses_api from "../api/Show_expenses_api";
import Download_expenses_pdf from "./Download_expense_pdf";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Add_expenses() {
  const [expenseFormData, setExpenseFormData] = useState({
    amountSpent: 0,
    expenseDescription: "",
    category: "",
  });

  const { isLogin, loginEmail, isPremium, totalAmount } = useSelector(
    (state) => state.counter
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isLogin) {
  //     alert("please Login first");
  //     navigate("/login");
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("test", expenseFormData);
    const sendExpenseFormData = async () => {
      const response = await Add_expenses_api(expenseFormData);
      const increaseExpenseAmount = await Increase_expense_amount_api(
        loginEmail,
        expenseFormData.amountSpent
      );

      if (increaseExpenseAmount == true && response == true) {
        alert("Expnese Added");
        dispatch(totalExpenseAmount(parseInt(expenseFormData.amountSpent)));
      } else {
        alert("Network issue please try again later");
      }
    };
    sendExpenseFormData();
  };

  // Update state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData({
      ...expenseFormData,
      [name]: value,
    });
  };

  const handleDropdownItemClick = (itemName) => {
    setExpenseFormData({
      ...expenseFormData,
      category: itemName,
    });
  };

  return (
    <>
      <Add_expenses_header />

      <div className="d-flex align-items-center justify-content-center">
        <div className="signup-container">
          <h2 className="bg-blue-500 text-white p-2">Add Expenses</h2>
          <Form>
            <Form.Group controlId="formBasicamountSpent">
              <Form.Label className="bg-white-1000 text-black p-2 text-lg font-bold">
                Amount Spent
              </Form.Label>

              <Form.Control
                type="amountSpent"
                placeholder="Enter amountSpent"
                name="amountSpent"
                value={expenseFormData.amountSpent}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicexpenseDescription">
              <Form.Label className="bg-white-900 text-black p-2 text-lg font-bold">
                Expense Description
              </Form.Label>
              <Form.Control
                type="expenseDescription"
                placeholder="expenseDescription"
                name="expenseDescription"
                value={expenseFormData.expenseDescription}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <br />

            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                className="bg-blue-600"
                id="dropdown-basic"
              >
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleDropdownItemClick("Grocery")}
                >
                  Grocery
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleDropdownItemClick("Clothes")}
                >
                  Clothes
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleDropdownItemClick("Something else")}
                >
                  Something else
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />

            <Button
              variant="success"
              className="bg-blue-600"
              type="submit"
              onClick={handleSubmit}
            >
              Add Expense
            </Button>
          </Form>
          <br></br>

          {!isPremium && (
            <Toast className="bg-red-300">
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Buy Premium</strong>
                <small>2 mins ago</small>
              </Toast.Header>
              <Toast.Body>
                We also provide some advance features like Leaderboard and
                expense Reports for our Premium members
              </Toast.Body>
            </Toast>
          )}
        </div>
      </div>
    </>
  );
}

function Add_expenses_header() {
  const { isLogin, loginEmail, isPremium, totalAmount } = useSelector(
    (state) => state.counter
  );

  const pdfRef = useRef();

  const [fetchExpensesData, setFetchExpensesData] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout_button = () => {
    dispatch(makeLogin(false));
    navigate("/login");
  };

  const handleBuyPremiumButton = () => {
    alert("You are now a Premium Member");
    dispatch(makePremium(true));
  };

  const handleDownloadExpense = async () => {
    try {
      console.log("Downloading the file");

      // Fetch expenses data
      const result = await Show_expenses_api();
      setFetchExpensesData(result);

      // Generate PDF with custom width
      const pdfWidth = 510; // Width in millimeters
      const pdfHeight = 397; // Height in millimeters
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      // Add expenses data to PDF
      pdf.text("Expense Report", 10, 10);

      fetchExpensesData.forEach((expense, index) => {
        const yPos = 20 + index * 10; // Adjust the vertical position
        pdf.text(`Expense ${index + 1}: ${JSON.stringify(expense)}`, 10, yPos);
      });

      // Save the PDF
      pdf.save("expenses.pdf");
    } catch (error) {
      console.error("Error downloading expense report:", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary m-8">
      <Container className="bg-red-500 p-3">
        <Navbar.Brand>Home</Navbar.Brand>
        <Navbar.Brand className="text-yellow-500">
          <FontAwesomeIcon icon={faGem} className="mr-2" />
          <Button onClick={handleBuyPremiumButton}>Buy Premium</Button>
        </Navbar.Brand>

        {isPremium ? (
          <Button onClick={handleDownloadExpense}>
            Download Expense Report
          </Button>
        ) : null}
        {isPremium ? <Link to="/showleaderboard">Show Leaderboard</Link> : null}

        <Link to="/showexpenses">Show Expenses</Link>

        <Button
          variant="primary"
          onClick={logout_button}
          className="bg-blue-600"
        >
          <Navbar.Brand>Logout</Navbar.Brand>
        </Button>
      </Container>
    </Navbar>
  );
}

export default Add_expenses;
