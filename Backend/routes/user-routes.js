const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Blog = require("../models/Blog");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "NaiduGr!!!";
//getting all users

router.get("/", async (req, res, next) => {
  let users;

  try {
    users = await User.find({});
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  console.log(users);
  return res.json({ users });
});

//signup route

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser = null;
  let success = false;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res.json({ error: "User Already Exists! Login Instead" });
  }
  const salt = await bcrypt.genSaltSync(10);
  const saltpassword = await bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    name,
    email,
    password: saltpassword,
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  const payload = {
    userId: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  success = true;
  return res.json({ success, token });
});

//login route
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({ error: "Couldnt Find User By This Email" });
    }
    const passcmp = await bcrypt.compare(password, existingUser.password);
    if (!passcmp) {
      success = false;
      return res.json({ success, error: "Enter correct creds" });
    }
    const payload = {
      userId: existingUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    console.log(token);
    success = true;
    return res.json({ success, token });
  } catch (error) {
    console.error(error.message);
    return res.json("internal error occur");
  }
});

module.exports = router;
