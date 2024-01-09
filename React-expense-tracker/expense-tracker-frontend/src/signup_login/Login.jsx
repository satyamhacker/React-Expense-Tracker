import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Signup_api, login_api } from "../api/Signup_Login_api";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  makeLogin,
  setLoginEmail,
  makePremium,
  totalExpenseAmount,
} from "../redux/counterSlice";

const Login = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const login_check = async () => {
      const response = await login_api(formData);
      //console.log(response);
      if (response[0] == "login successfull") {
        alert("login successfull");
        //console.log("test", response[1]);
        dispatch(makeLogin(true));
        dispatch(setLoginEmail(response[1].email));
        dispatch(makePremium(response[1].isPremium));
        dispatch(totalExpenseAmount(response[1].totalExpense));
        navigate("/addexpenses");
      }
    };
    login_check();
  };

  // Update state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="signup-container">
        <h2 className="bg-blue-500 text-white p-2">
          Expense Tracker Login Page
        </h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="bg-white-1000 text-black p-2 text-lg font-bold">
              Email address
            </Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="bg-white-900 text-black p-2 text-lg font-bold">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button
            className="bg-blue-200"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
        <div className="mt-4 active:bg-green-600 underline">
          <Link to="/" className="font-bold bg-white">
            Go to Signup page
          </Link>
        </div>
        <div className="mt-4 active:bg-green-600 underline">
          <Link to="#" className=" bg-green-400">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
