import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";

import Appbar from "./components/Appbar";
import AuthLayout from "./pages/AuthLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokenState, isAuthenticated } from "./store";
import WrapperLayout from "./pages/WrapperLayout";
const Login = React.lazy(() => import("./pages/Login"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));

const MyPosts = React.lazy(() => import("./pages/MyPosts"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));

const Following = React.lazy(() => import("./pages/Following"));

const Blogs = React.lazy(() => import("./pages/Blogs"));
const Signup = React.lazy(() => import("./pages/Signup"));
const CreateBlog = React.lazy(() => import("./pages/CreateBlog"));
const EditPost = React.lazy(() => import("./pages/EditPost"));

const UserBlogPosts = React.lazy(() => import("./pages/UserBlogPosts"));
const Followings = React.lazy(() => import("./pages/Followings"));
const Followers = React.lazy(() => import("./pages/Followers"));
const Suggestions = React.lazy(() => import("./pages/Suggestions"));

function App() {
  const authToken = useRecoilValue(authTokenState);
  const isAuth = useRecoilValue(isAuthenticated);

  return (
    <BrowserRouter>
      <Appbar />
      <React.Suspense
        fallback={
          <div className="bg-[#121212] flex min-h-screen">
            <section className="col-span-12 md:col-span-8 lg:col-span-6 text-white text-4xl">
              loading...
            </section>
          </div>
        }
      >
        <Routes>
          <Route>
            <Route
              path="/login"
              element={
                <RequireGuest>
                  <Login />
                </RequireGuest>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireGuest>
                  <Signup />
                </RequireGuest>
              }
            />
          </Route>

          {isAuth && authToken ? (
            <Route>
              <Route element={<AuthLayout />}>
                <Route path="/" element={<Blogs />} />
                <Route path="/following" element={<Following />} />
                {/* <Route path="/blog/create" element={<CreateBlog />} /> */}
                <Route path="/my-posts" element={<MyPosts />} />
              </Route>
              <Route element={<WrapperLayout />}>
                <Route path="/user/:id" element={<UserBlogPosts />} />
                <Route path="/user/:id/followings" element={<Followings />} />
                <Route path="/user/:id/followers" element={<Followers />} />
                <Route path="/user/:id/followers" element={<Followers />} />
                <Route path="/user/:id/suggestions" element={<Suggestions />} />

                {/* <Route path="/my-profile" element={<MyPosts />} /> */}
                <Route path="/edit-profile" element={<EditProfile />} />
              </Route>
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/blog/create" element={<CreateBlog />} />
              <Route path="/blog/update/:id" element={<EditPost />} />
            </Route>
          ) : (
            <>
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

const RequireGuest = ({ children }: any) => {
  // const userAuth = useRecoilValue(isAuthenticated);
  // const authToken = useRecoilValue(authTokenState);
  const [token, setToken] = useRecoilState(authTokenState);
  const [isAuth, setIsAuth] = useRecoilState(isAuthenticated);
  // const navigate = useNavigate();

  // const myProfileDetails = useRecoilValue(myProfileDetailsAtom);
  console.log({ isAuth, token });
  useEffect(() => {
    if (!token) {
      setIsAuth(false);
      setToken(null);
      //    navigate("/login");
    } else {
      setIsAuth(true);
      //     navigate("/");
    }
    console.log({ isAuth });
  }, []);
  if (isAuth && authTokenState) {
    return <Navigate to="/" replace />;
  }
  <Navigate to="/login" replace />;
  return children;
};

export default App;
