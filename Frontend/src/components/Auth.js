import React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  CssBaseline,
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [error, seterror] = useState("");
  useEffect(() => {
    seterror("");
  }, [isSignup]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const response = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    console.log(response);
    const data = await response.data;
    console.log(data);
    if (data.success) {
      return data;
    } else {
      seterror(data.error);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("token", data.token))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .catch((err) => {
          console.log("Hii");
        });
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("token", data.token))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .catch((err) => {
          console.log(err);
        });
    }
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignup ? "Signup" : "Login"}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {isSignup && (
                <TextField
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  value={inputs.name}
                  label="Name"
                  name="name"
                />
              )}
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="email"
                value={inputs.email}
                label="Email Address"
                name="email"
              />
              <TextField
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                value={inputs.password}
                label="Password"
                type="password"
                id="password"
              />
              <span style={{ color: "red" }}>{error}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSignup ? "Signup" : "Login"}
              </Button>
              <Button
                onClick={() => setIsSignup(!isSignup)}
                sx={{ borderRadius: 3, marginTop: 3 }}
              >
                Change To {isSignup ? "Login" : "Signup"}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Auth;
