const jwt = require("jsonwebtoken");

const secretKey = "SonuMedicalShop"; // Replace with your secret key

const EncodeUserJwt = (email) => {
  const payload = { email }; // Make sure payload is an object

  const options = {
    expiresIn: "12h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

const DecodeUserJwt = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token:", decoded);
    return decoded;
  } catch (err) {
    console.error("JWT Verification Failed:", err.message);
  }
};

module.exports = {
  EncodeUserJwt,
  DecodeUserJwt,
};
