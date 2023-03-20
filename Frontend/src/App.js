import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header.js";
import AddBlog from "./components/AddBlog.js";
import Auth from "./components/Auth.js";

import Blogs from "./components/Blogs.js";
import UserBlogs from "./components/UserBlogs";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route exact path="/" element={<Auth />} />
              <Route exact path="/auth" element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
