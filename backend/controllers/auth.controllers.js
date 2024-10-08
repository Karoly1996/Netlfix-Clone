import { User } from "../models/user.js";
import bcryptjs from "bcryptjs"

export async function signup(req, res) {
  try {
    const {email,password,username} = req.body;

    if(!email || !password || !username) {
      return res.status(400).json({success:false, messsage: "All fields are required" })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailRegex.test(email)){
      return res.status(400).json({success:false,message:"Invalid email"})
    }

    if(password.length < 6) {
      return res.status(400).json({success:false,message:"Password must be atleast 6 characters"})
    }

    const existingUserByEmail = await User.findOne({email:email})
    if(existingUserByEmail) {
      return res.status(400).json({success:false,message:"Email already exists"})
    }

    const existingUserByUsername = await User.findOne({username:username})
    if(existingUserByUsername) {
      return res.status(400).json({success:false,message:"Username already exists"})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png","/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    
    const newUser = new User({
      email:email,
      password:hashedPassword,
      username:username,
      image:image
    })

    await newUser.save();

    // remove password from response
    res.status(201).json({success: true, user: {
      ...newUser._doc,
      password:""
    }})
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({success:false,message:"Internal server error"})
  }
}



export async function login(req, res) {
  res.send("Login Route")
}



export async function logout(req, res) {
  res.send("Logout Route")
}
