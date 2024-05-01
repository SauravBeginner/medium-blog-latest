import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";

import Appbar from "./components/Appbar";
import AuthLayout from "./pages/AuthLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { authTokenState, isAuthenticated } from "./store/atom";
import { BlogCardSkeleton } from "./components/BlogCardSkeleton";
import UserBlogDetails from "./pages/UserBlogDetails";

const Login = React.lazy(() => import("./pages/Login"));
const BlogDetails = React.lazy(() => import("./pages/BlogDetails"));

const MyProfile = React.lazy(() => import("./pages/MyProfile"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));

const Blogs = React.lazy(() => import("./pages/Blogs"));
const Signup = React.lazy(() => import("./pages/Signup"));

function App() {
  const authToken = useRecoilValue(authTokenState);
  const isAuth = useRecoilValue(isAuthenticated);
  // console.log({ userAuth });

  return (
    <BrowserRouter>
      <Appbar />
      <React.Suspense
        fallback={
          <div className="bg-black flex min-h-screen">
            <section className="col-span-12 md:col-span-8 lg:col-span-6">
              <>
                <BlogCardSkeleton />
              </>
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
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/user/blog/:id" element={<UserBlogDetails />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
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
