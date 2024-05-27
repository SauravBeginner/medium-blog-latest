import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@10xcoder/medium-blog-common";
import { useState } from "react";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { publicAxios } from "../utils/axiosClient";
import { useSetRecoilState } from "recoil";
import { authState } from "../store/atoms/userAtoms";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const setAuthStatus = useSetRecoilState(authState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninInput>({});

  const handleLogin = async (data: any) => {
    setError("");
    try {
      const response = await publicAxios.post(`/signin`, data);
      const token = response.data.jwt;
      console.log(response.data);

      localStorage.setItem("token", token);
      // setAuthToken(token); // Invalidate the current profile details to trigger re-fetch
      // setIsAuth(true);
      setAuthStatus({ status: true });
      navigate("/", { replace: true });
    } catch (e: any) {
      console.log(e.response.data?.error);
      setError(e.response.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        Log in to your account
      </h1>
      <p className="mt-2 text-sm">
        Don't have an account?
        <Link className="text-blue-600" to="/signup">
          Signup
        </Link>
      </p>
      <div className="flex flex-col space-y-4 mt-8">
        <Input
          className="focus:bg-gray-100"
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
          className="focus:bg-gray-100"
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
