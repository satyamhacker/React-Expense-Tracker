const mongoose = require("../Models/Mongoose");


const SignupData = require("../Models/SignupData");

const signupCreate = async (req, res) => {
  try {
    // Extract data from the request body
    const { email, password } = req.body;

    console.log("input email==>", email);
    console.log("input password==>", password);

    // // Create a new signup data record in the database
    const newSignupData = await SignupData.create({
      email: email,
      password: password,
    });

    // Respond with the newly created signup data
    res.status(201).json("user created");
  } catch (error) {
    console.error("Error creating signup data:", error);
    // Handle the error and respond with an error status code
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    // Extract data from the request body
    const { email, password } = req.body;

    const user = await SignupData.findOne({ email: email });
    // console.log(user.password)
    if (user.password == password) {
      //let EncodeUserJwtToken = JwtMiddleWare.EncodeUserJwt(email);
      //console.log("encoded jwt", EncodeUserJwtToken);
      res.status(201).json(["login successfull", user]);
    } else {
      res.status(500).json({ error: "please check email password" });
    }
  } catch (error) {
    console.error("Error checking login data:", error);
    // Handle the error and respond with an error status code
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signupCreate,
  login,
};
