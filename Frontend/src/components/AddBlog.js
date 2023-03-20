import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  CssBaseline,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await fetch("http://localhost:5000/api/blog/addblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: inputs.title,
        description: inputs.description,
        imageURL: inputs.imageURL,
      }),
    }).catch((err) => console.log(err));
    const data = await res.json();
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Blog
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="title"
                value={inputs.title}
                label="Title"
                name="title"
                placeholder="Title"
              />

              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="description"
                value={inputs.description}
                label="Description"
                name="description"
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="imageURL"
                value={inputs.imageURL}
                label="ImageURL"
                id="imageURL"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                AddBlog
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AddBlog;
