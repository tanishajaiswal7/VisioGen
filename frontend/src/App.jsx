import "./App.css";




import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./Pages";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
    window.location.href = "/login";
  };

  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, []);

  return (
    <BrowserRouter>
      <header className="border-black w-full justify-between flex items-center border-b bg-black sm:px-8 px-4 py-4 border-r[#e6ebf4]">
        <div className="flex items-center gap-4">
          <Link to={"/"}>
            <img className="h-[27.5px] w-28 object-cover" src={logo} alt="logo" />
          </Link>
          <Link to="/about" className="text-white font-medium px-2">About Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white font-medium px-2">Home</Link>
          {user ? (
            <>
              <span className="text-white font-medium px-2">{user}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 px-4 py-2 rounded-lg font-bold shadow-md ml-2"
                style={{ boxShadow: '0 4px 16px 0 rgba(100,105,255,0.18)' }}
              >
                Logout
              </button>
              <Link to="/create-post" className="text-white px-4 py-2 rounded-md font-inter bg-[#4649ff] font-medium">Create</Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 px-4 py-2 rounded-lg font-bold shadow-md font-inter"
                style={{ boxShadow: '0 4px 16px 0 rgba(100,105,255,0.18)' }}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 bg-[#2A3132] w-full min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/create-post" element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
