import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [values, setValues] = useState({
    // email: '',
    identifier: "", // Changed from email to identifier
    password: "",
  });
  const navigate = useNavigate();
  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg px-8 py-5 border w-72">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <form onSubmit={handleSumbit}>
          <div className="mb-4">
                       <label htmlFor="identifier" className="block text-gray-700">
              Email/Phone/Username
            </label>
            <input
              type="text"
              placeholder="Enter Email, Phone, or Username"
              className="w-full px-3 py-2 border"
              name="identifier"
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2 border"
              name="password"
              onChange={handleChanges}
            />
          </div>
          <button className="w-full bg-green-600 text-white py-2 ">
            Submit
          </button>
        </form>
        <div className="text-center">
          <span>Don't Have Account?</span>
          <Link to="/register" className="text-blue-500">
            Signup
          </Link>
        </div>
        <div className="text-center mt-2">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
