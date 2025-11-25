import React, { useState } from "react";
import axios from "axios";
const Api = import.meta.env.VITE_API_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Api}/api/forgot-password`, { email });
      alert("Reset link sent to your email");
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-300 h-screen w-full flex fixed justify-center items-center overflow-hidden">
      <div className="bg-green-400 h-[350px] w-[400px] flex justify-center items-center rounded-xl shadow-xl">
        <form onSubmit={SubmitHandler} className="flex flex-col gap-6 p-8">
          <h1 className="text-xl font-bold text-center mb-4">Forgot Password</h1>

          <input
            type="email"
            placeholder="Enter your registered email"
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
