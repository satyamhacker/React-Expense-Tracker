import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Signup_api, login_api } from "../api/Signup_Login_api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  // State to store input values

  const page = "Expense Tracker Signup";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const signup_create = async () => {
      const response = await Signup_api(formData);
      if (response == "user created") {
        alert("user created now you can login");
        navigate("/login");
      } else {
        alert("There is some network error please try again later");
      }
    };
    signup_create();
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
        <h2 className="bg-blue-500 text-white p-2">{page} Page</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="bg-white-1000 text-black p-2 text-lg font-bold">
              Email address
            </Form.Label>
            {/* Use the value and onChange props to bind the input to state */}
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

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        <div className="mt-4 active:bg-green-600 underline">
          <Link to="/login" className="font-bold bg-white">
            Go to login page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
