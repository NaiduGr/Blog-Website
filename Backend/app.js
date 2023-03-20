const express = require("express");
const mongoose = require("mongoose");
const userrouter = require("./routes/user-routes");
const blogrouter = require("./routes/blog-routes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userrouter);
app.use("/api/blog", blogrouter);
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/userDBblog", { useNewUrlParser: true })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hii");
});

app.listen(5000);
