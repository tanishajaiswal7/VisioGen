import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Password validation: min 8 chars, 1 capital, 1 special char
    const password = form.password;
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setError("Password must be at least 8 characters, include a capital letter and a special character.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.name);
        setUser(data.name);
        navigate("/");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 p-0">
      <div className="bg-gray-900 rounded-2xl shadow-2xl px-8 py-10 border-2 border-transparent transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/40" style={{ boxShadow: '0 8px 32px 0 rgba(100,105,255,0.25)' }}>
        <h2 className="text-3xl font-extrabold mb-6 text-[#fbfdf6] text-center tracking-wide">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300 outline-none shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300 outline-none shadow-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all duration-300 outline-none shadow-sm"
            required
          />
          {error && <div className="text-red-400 text-center font-semibold">{error}</div>}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white py-2.5 rounded-lg font-bold shadow-md mt-2">Register</button>
          <button
            type="button"
            className="underline font-semibold transition-colors duration-200 text-[#fbfdf6] hover:text-blue-400"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
