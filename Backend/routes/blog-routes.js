const express = require("express");
const mongoose = require("mongoose");
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blog");
const User = require("../models/User");
const router = express.Router();

//getting all Blogs
router.get("/", fetchuser, async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find({});
  } catch (err) {
    return console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }

  return res.status(200).json({ blogs });
});

//addBlog router
router.post("/addblog", fetchuser, async (req, res) => {
  const { title, description, imageURL } = req.body;
  console.log("Hii");
  console.log(req.user);
  const blog = new Blog({
    title,
    description,
    imageURL,
    user: req.user,
  });
  try {
    await blog.save();
  } catch (err) {
    return console.log(err);
  }
  console.log(blog);
  console.log("added");
  return res
    .status(200)
    .json({ message: "Successfully added the blog ", blog });
});

//getting all the blogs of an user
router.get("/userblogs", fetchuser, async (req, res, next) => {
  const userBlogs = await Blog.find({ user: req.user });
  console.log(userBlogs);
  return res.status(200).json({ userBlogs });
});
//update route
router.put("/update/:id", fetchuser, async (req, res) => {
  const id = req.params.id;
  const { title, description, imageURL, user } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
      imageURL,
      user: req.user,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res
      .status(500)
      .json({ message: "some error occured.Unable to update the blog." });
  }
  return res.status(200).json({ blog });
});

//getting a blog by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }
  return res.status(200).json({ blog });
});

//delete route
router.delete("/:id", fetchuser, async (req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.json({ message: "Unable to delete the blog" });
  }
  let blogs, userblogs;
  try {
    blogs = await Blog.find({});
    userblogs = await Blog.find({ user: req.user.toString() });
  } catch (err) {
    console.log(err);
  }
  return res.json({ blogs, userblogs });
});

module.exports = router;
