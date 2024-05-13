const userModel = require("../Models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const md5 = require("md5");
const { createJwt } = require("../Middlewares/jwtMiddleware");

// Controller to register user
async function register(req, res) {
    const body = req.body;
    console.log("Received data:", req.body);
  
    if (!(body.email && body.password && body.username && body.role)) {
      res.status(400).send("All input required");
    }
    const email = body.email;
    const oldEmail = await userModel.findOne({ email });
    if (oldEmail) {
      return res.status(409).send("Email already used");
    }
    const md5Password = md5(body.password);
    console.log(body)
    const user = await userModel.create({
      email: body.email,
      password: md5Password,
      username: body.username,
      role: body.role,
    });
    return res.status(201).send(user);
  }

  //Controller to log user in 
  async function logIn(req, res) {
    const { email, password } = req.body;
  
    if (!(email && password)) {
      return res.status(400).send("All input are required");
    }
  
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    const password_check = md5(password) === user.password;
  
    if (!password_check) {
      return res.status(400).send("Invalid Credentials");
    }
  
    const token = createJwt(user);
    console.log(token);
    return res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: false,
      })
      .send(user);
  }
// Controller to log user out
  async function logOut(req, res) {
    return res.status(201).clearCookie("token").send("logged out");
  }
// Controller that gets all users
  async function getAllUsers(req, res) {
    const users = await userModel.find({});
    return res.status(200).send(users);
  }

  module.exports={
    register,logIn, logOut, getAllUsers
  }