import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import Appbar from "./components/Appbar";
import AuthLayout from "./components/AuthLayout";
import AuthHandle from "./components/AuthHandle";
import WrapperLayout from "./components/WrapperLayout";
import { BlogCardSkeleton } from "./components/BlogCardSkeleton";

const AllBlogs = React.lazy(() => import("./pages/AllBlogs"));
const MyBlogs = React.lazy(() => import("./pages/MyBlogs"));

const FollowingBlogs = React.lazy(() => import("./pages/FollowingBlogs"));
// const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const UserBlogs = React.lazy(() => import("./pages/UserBlogs"));

const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

const CreateBlog = React.lazy(() => import("./pages/CreateBlog"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));

const EditPost = React.lazy(() => import("./pages/EditPost"));
const FollowingUsers = React.lazy(() => import("./pages/FollowingUsers"));
const FollowerUsers = React.lazy(() => import("./pages/FollowerUsers"));
const Suggestions = React.lazy(() => import("./pages/Suggestions"));

const EditProfile = React.lazy(() => import("./pages/EditProfile"));

const App = () => {
  return (
    <BrowserRouter>
      <Appbar />
      <React.Suspense
        fallback={
          <div>
            {" "}
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        }
      >
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
            <Route path="/user/:id/edit-profile" element={<EditProfile />} />
          </Route>
          <Route
            path="/blog/create"
            element={
              <AuthHandle>
                <CreateBlog />
              </AuthHandle>
            }
          />
          <Route
            path="/blog/update/:id"
            element={
              <AuthHandle>
                <EditPost />
              </AuthHandle>
            }
          />
          <Route
            path="/blog/:id"
            element={
              <AuthHandle>
                <BlogDetails />
              </AuthHandle>
            }
          />{" "}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
