const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    //if you attempt to use an expire token , you'll receivea "401 uthauthorized HTTP , response"
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provides " });
  }
  // assuming token is in the format "Bearer <jwtToken>, remove the "Bearer" prefix
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth middle", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid Token" });
  }
};

module.exports = authMiddleware;
