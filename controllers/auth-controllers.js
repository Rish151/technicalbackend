const bcrypt = require("bcryptjs");
const User = require ("../models/user-models");
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome router");
  } catch (error) {
    console.log(error);
  }
};

//REGISTRATION LOGIC
const register = async (req, res) => {
  try {
    //console.log(req.body);
    const { username, email, phone, password } = req.body;
    
    const userExist = await User.findOne({ email : email }); 
    if (userExist) {
      return res.status(400).json({message: "email already exist "});
    }


    const userCreated = await User.create({ username, email, phone, password }); 

    res.status(200).json({ msg: "Registration Successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString() });
  } catch (error) {
    //res.status(500).json("internal server error");
    next(error); //next is the middleware
  }
};  

//LOGIN LOGIC 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);

    if(!userExist){
      return res.status(400).json({ message: "Invalid Credentials"});
    }
     
    const user = await userExist.comparePassword(password);

    if(user){
      res.status(200).json({ msg: "Login Successful", token: await userExist.generateToken(), userId: userExist._id.toString() });
    }else {
      res.status(401).json({ message: "Invalid email and password" });
    }
    
  } catch (error) {
    res.status(500).json("internal server error");
  }
}

//USER LOGIC -To send user data 
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }

};

module.exports = {
  home,
  register,
  login,
  user,
};