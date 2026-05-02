import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
     const res = await axios.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">

      <div className="bg-zinc-900/80 backdrop-blur-lg p-10 rounded-2xl w-[380px] shadow-xl border border-zinc-800">

        {/* Title */}
        <h2 className="text-white text-3xl font-bold mb-8 text-center">
          🎧 Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500 transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full mb-6 p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500 transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition duration-300"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}