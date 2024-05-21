import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Appbar from "./components/Appbar";
import AuthLayout from "./components/AuthLayout";
import AuthHandle from "./components/AuthHandle";
import WrapperLayout from "./components/WrapperLayout";

const AllBlogs = React.lazy(() => import("./pages/AllBlogs"));
const MyBlogs = React.lazy(() => import("./pages/MyBlogs"));

const FollowingBlogs = React.lazy(() => import("./pages/FollowingBlogs"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const UserBlogs = React.lazy(() => import("./pages/UserBlogs"));

const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

const CreateBlog = React.lazy(() => import("./pages/CreateBlog"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));

const EditPost = React.lazy(() => import("./pages/EditPost"));
const FollowingUsers = React.lazy(() => import("./pages/FollowingUsers"));
const FollowerUsers = React.lazy(() => import("./pages/FollowerUsers"));
const Suggestions = React.lazy(() => import("./pages/Suggestions"));

const App = () => {
  return (
    <BrowserRouter>
      <Appbar />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route>
            <Route
              path="/login"
              element={
                <AuthHandle>
                  <Login />
                </AuthHandle>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthHandle>
                  <Signup />
                </AuthHandle>
              }
            />
          </Route>

          <Route
            element={
              <AuthHandle>
                <AuthLayout />
              </AuthHandle>
            }
          >
            <Route path="/" element={<AllBlogs />} />
            <Route path="/my-posts" element={<MyBlogs />} />
            <Route path="/following-blogs" element={<FollowingBlogs />} />
          </Route>
          <Route
            element={
              <AuthHandle>
                <WrapperLayout />
              </AuthHandle>
            }
          >
            {/* <Route path="/user/:id" element={<UserProfile />} /> */}
            <Route path="/user/:id" element={<UserBlogs />} />
            <Route path="/user/:id/followings" element={<FollowingUsers />} />
            <Route path="/user/:id/followers" element={<FollowerUsers />} />
            <Route path="/user/:id/suggestions" element={<Suggestions />} />
          </Route>
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/blog/update/:id" element={<EditPost />} />

          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
