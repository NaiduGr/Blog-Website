import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [userBlogs, setuserBlogs] = useState([]);
  const token = localStorage.getItem("token");

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog/userblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .catch((err) => console.log(err));
    console.log(res);
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setuserBlogs(data.userBlogs));
  }, []);
  console.log(userBlogs);
  return (
    <div>
      {token &&
        userBlogs &&
        userBlogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.imageURL}
            username="name"
            setuserBlogs={setuserBlogs}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
