import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Api = import.meta.env.VITE_API_URL;



function SignUp() {
  const navigate = useNavigate();
  const [formData,setFormdata]= useState({
    userName:"",
    email:"",
    password:"",
    image:null
  })
  const onchangehandler =(e)=>{
    setFormdata({
      ...formData,
      [e.target.name]:e.target.type ==="file"?e.target.files[0] : e.target.value,

    })

  }

  const Submithandler =(e) =>{
    e.preventDefault()

    const data = new FormData()
    data.append("userName",formData.userName);
    data.append("email",formData.email);
    data.append("password",formData.password);
    data.append("image",formData.image)

    try{
      const res = axios.post(`${Api}/api/user/create`,data);
      alert('sahi h')
       navigate('/login')
    } catch (error) {
    alert("Signup failed!");
    console.error(error);
  }
  }   

  





  return (
    <div className="bg-gray-300 min-h-screen w-full flex justify-center items-center overflow-hidden">
      <div className="bg-green-400  rounded-xl shadow-xl transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 transform-gpu">
        <form className="flex flex-col gap-6 p-10" onSubmit={Submithandler}>
          <label className="font-semibold text-white">User Name</label>
          <input
            type="text"
            name="userName"
            onChange={onchangehandler}
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-600"
            placeholder="Enter your name"
          />

          <label className="font-semibold text-white">Email</label>
          <input
            type="email"
            name="email"
            onChange={onchangehandler}
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-600"
            placeholder="Enter your email"
          />

          <label className="font-semibold text-white">Password</label>
          <input
            type="password"
            name="password"
            onChange={onchangehandler}
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-600"
            placeholder="Enter your password"
          />
          <label className="font-semibold text-white">image</label>

          <input
            type="file"
            name="image"
            onChange={onchangehandler}
            accept="image/*"
            className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:border-blue-600 bg-white text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl mt-4 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-xl"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
