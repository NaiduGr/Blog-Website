import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setblogs] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.imageURL}
            username="name"
            setblogs={setblogs}
          />
        ))}
    </div>
  );
};

export default Blogs;
