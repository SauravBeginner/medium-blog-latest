import { Link, useNavigate } from "react-router-dom";
import { LabelInput } from "./LabelInput";
import { signinInput, SigninInput } from "@10xcoder/medium-blog-common";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseUrl";
import { Button } from "./Button";
import { authTokenState } from "../store";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Input from "./Input";

export const LoginForm = () => {
  const navigate = useNavigate();

  // const [userInput, setUserInput] = useState<SigninInput>({
  //   email: "",
  //   password: "",
  // });

  const setAuthToken = useSetRecoilState(authTokenState);
  // const setIsAuth = useRecoilValue(isAuthenticated);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({});

  const handleLogin = async (data: any) => {
    setError("");
    try {
      const response = await axios.post(`${baseURL}/signin`, data);
      const token = response.data.jwt;
      console.log(response.data);

      localStorage.setItem("token", token);
      setAuthToken(token); // Invalidate the current profile details to trigger re-fetch
      // setIsAuth(true);

      navigate("/", { replace: true });
    } catch (e: any) {
      console.log(e.response.data?.error);
      setError(e.response.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1 className="text-4xl font-bold">Log in to your account</h1>
      <p className="mt-2 text-sm">
        Don't have an account?
        <Link className="text-blue-600" to="/signup">
          Signup
        </Link>
      </p>
      <div className="flex flex-col space-y-4 mt-8">
        <Input
          label="email"
          placeholder="m@example.com"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
        <Input
          label="password"
          placeholder="••••••••"
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 20,
              message: "Password cannot exceed 20 characters",
            },
          })}
          type="password"
        />

        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <Button>Login</Button>
      </div>
    </form>
  );
};
