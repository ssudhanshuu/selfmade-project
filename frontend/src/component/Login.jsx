import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Api = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const OnChangeHandler = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Api}/api/user/login`, formData);

      alert("Login Successfully");
      console.log("Response:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/product");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-300 h-screen w-full flex fixed justify-center items-center overflow-hidden">
      <div className="bg-green-400 h-[400px] w-[400px] flex justify-center items-center rounded-xl shadow-xl transition-all duration-200 hover:shadow-xl hover:-translate-1">
        <form className="flex flex-col gap-6 p-10" onSubmit={SubmitHandler}>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={OnChangeHandler}
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-600 bg-white text-black"
            placeholder="Enter your email"
          />

          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={OnChangeHandler}
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-600 bg-white text-black"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl mt-4 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl"
          >
            Login
          </button>
            <p
          className="text-blue-900 cursor-pointer underline text-center"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
        </form>
      
      </div>
      
    </div>
  );
}
