import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Blog = (props) => {
  const navigate = useNavigate();

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .catch((err) => console.log(err));
    const data = await res.json();
    props.setblogs(data.blogs);
    props.setuserBlogs(data.userblogs);
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/blogs"));
  };
  return (
    <Card
      sx={{
        width: "40%",
        maxWidth: "500",
        margin: "auto",
        marginTop: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {props.username}
          </Avatar>
        }
        title={props.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        maxHeight="400"
        maxWidth="400"
        image={props.imageURL}
        alt="image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      {props.isUser && (
        <Box display="flex">
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
};

export default Blog;
