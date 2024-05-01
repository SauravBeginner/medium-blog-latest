import { Link, useNavigate } from "react-router-dom";
import { LabelInput } from "./LabelInput";
import { signupInput } from "@10xcoder/medium-blog-common";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseUrl";
import { Button } from "./Button";

export const Signup = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<signupInput>({
    email: "",
    password: "",
    name: "",
  });

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${baseURL}/signup`, userInput);

      console.log(response.data);
      const token = await response.data.token;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (e) {
      console.log(e);
      alert("Error while signing up");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold">Create an account</h1>
      <p className="mt-2 text-sm">
        Already have an account?
        <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p>
      <div className="flex flex-col space-y-4 mt-8">
        <LabelInput
          label="Name"
          placeholder="Enter your Full Name"
          onChange={(e) => {
            setUserInput({
              ...userInput,
              name: e.target.value,
            });
          }}
        />
        <LabelInput
          label="email"
          placeholder="m@example.com"
          onChange={(e) => {
            setUserInput({
              ...userInput,
              email: e.target.value,
            });
          }}
          type="email"
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
        <Button onClick={handleSignup}>Login</Button>
      </div>
    </>
  );
};
