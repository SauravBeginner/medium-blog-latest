import { Link, useNavigate } from "react-router-dom";
import { LabelInput } from "./LabelInput";
import { SigninInput } from "@10xcoder/medium-blog-common";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseUrl";
import { Button } from "./Button";
import { authTokenState } from "../store";
import { useSetRecoilState } from "recoil";

export const Login = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const setAuthToken = useSetRecoilState(authTokenState);
  // const setIsAuth = useRecoilValue(isAuthenticated);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/signin`, userInput);
      const token = response.data.jwt;
      console.log(response.data?.token);
      localStorage.setItem("token", token);
      setAuthToken(token); // Invalidate the current profile details to trigger re-fetch
      // setIsAuth(true);

      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
      //   alert("Error while Logging in up");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold">Log in to your account</h1>
      <p className="mt-2 text-sm">
        Don't have an account?
        <Link className="text-blue-600" to="/signup">
          Signup
        </Link>
      </p>
      <div className="flex flex-col space-y-4 mt-8">
        <LabelInput
          label="email"
          placeholder="m@example.com"
          type="email"
          onChange={(e) => {
            setUserInput({
              ...userInput,
              email: e.target.value,
            });
          }}
        />
        <LabelInput
          label="password"
          placeholder="••••••••"
          onChange={(e) => {
            setUserInput({
              ...userInput,
              password: e.target.value,
            });
          }}
          type="password"
        />
        {/* <button
          onClick={handleLogin}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 mt-4 bg-black text-white"
        >
          Login
        </button> */}

        <Button onClick={handleLogin}>Login</Button>
      </div>
    </>
  );
};
