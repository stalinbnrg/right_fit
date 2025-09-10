import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-orange-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left side - App Name */}
      <h1 className="text-lg font-bold">
        <Link to="/">My App</Link>
      </h1>

      {/* Right side - Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center focus:outline-none"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg border border-orange-200">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-orange-100"
            >
              Profile
            </button>
            <button
              onClick={() => {
                navigate("/about");
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-orange-100"
            >
              About
            </button>
            <button
              onClick={() => {
                navigate("/logout");
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-orange-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
