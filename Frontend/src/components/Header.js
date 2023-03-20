import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography>Blogs App</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto ">
            <Button LinkComponent={Link} to="/blogs" color="warning">
              All Blogs
            </Button>
            <Button LinkComponent={Link} to="/myBlogs" color="warning">
              My Blogs
            </Button>
            <Button LinkComponent={Link} to="/blogs/add" color="warning">
              Add Blog
            </Button>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
