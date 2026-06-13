import React, { useState } from "react";
import axios from "axios";
import { url } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter email");
    }

    if (!password.trim()) {
      return toast.error("Please enter password");
    }

    try {
      setLoading(true);

      const res = await axios.post(`${url}/user/login`, {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        toast.success("Login successful");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        <div className="text-center mb-8">
          <img
            src="/logo2.png"
            alt="logo"
            className="w-28 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-2">
            Login to manage orders and food items
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition hover:bg-slate-900"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;