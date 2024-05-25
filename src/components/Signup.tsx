import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@10xcoder/medium-blog-common";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseUrl";
import { Button } from "./Button";
import { useForm } from "react-hook-form";
import Input from "./Input";

export const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({});

  const handleSignup = async (data: any) => {
    setError("");
    try {
      const response = await axios.post(`${baseURL}/signup`, data);

      console.log(response.data);
      const token = await response.data.token;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (e: any) {
      console.log(e);
      setError(e.response.data?.error);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <h1 className="text-4xl font-bold">Log in to your account</h1>
      <p className="mt-2 text-sm">
        Already have an account?
        <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p>
      <div className="flex flex-col space-y-4 mt-8">
        <Input
          className="focus:bg-gray-100"
          label="Name"
          placeholder="Name"
          type="name"
          {...register("name", {
            required: true,
            minLength: {
              value: 4,
              message: "Name must be at least 4 characters",
            },
            maxLength: {
              value: 20,
              message: "Name cannot exceed 20 characters",
            },
          })}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
        <Input
          className="focus:bg-gray-100"
          label="Email"
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
          label="Enter Password"
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
        <Button>Signup</Button>
      </div>
    </form>
  );
};
