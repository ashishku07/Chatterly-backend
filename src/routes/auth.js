const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");

// Common cookie options for secure deployment
const cookieOptions = {
  expires: new Date(Date.now() + 8 * 3600000), // 8 hours
  httpOnly: true,
  secure: true, // Must be true for HTTPS
  sameSite: "None", // Allows cross-site cookie from frontend
};

// Signup API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const checkEmail = await User.findOne({ emailId });
    if (checkEmail) {
      throw new Error("Email Already Exist");
    }

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      // Optional fields
      age,
      gender,
      about,
      skills,
    });

    const savedUser = await user.save();
    const token = await savedUser.getjwt();

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "User added successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }

    const token = await user.getjwt();
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Logout API
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .send("User Logged out successfully");
});

module.exports = authRouter;
