import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully 🎉");
      navigate("/");
    } catch (err) {
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900/80 backdrop-blur-lg p-10 rounded-2xl w-[380px] shadow-xl border border-zinc-800"
      >

        {/* Title */}
        <h2 className="text-white text-3xl font-bold mb-8 text-center">
          🎧 Create Account
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

         <select
    className="w-full mb-4 p-2 rounded bg-zinc-800 text-white"
    onChange={(e) => setForm({ ...form, role: e.target.value })}
  >
    <option value="user">User</option>
    <option value="artist">Artist</option>
  </select>

        {/* Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition">
          Register
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}