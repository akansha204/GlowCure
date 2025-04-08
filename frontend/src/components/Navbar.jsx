import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Navigate, NavLink } from "react-router";
import LogoutPopup from "./LogoutPopup";
import useAuthStore from "../contexts/store/authStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  console.log("User in Navbar:", user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    Navigate("/login");
    console.log("User logged out!");
  };

  return (
    <nav className="flex sticky top-0 z-50 items-center justify-evenly px-6 py-4 w-full bg-[#A2C0A7] shadow-lg shadow-[#143117]/30">
      {/* Left Side - Menu Button and Links */}
      <div className="flex items-center gap-6 absolute left-8 lg:relative">
        <button
          className="lg:hidden text-2xl z-60"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden lg:flex items-center gap-6 text-lg font-medium">
          <NavLink
            to="/"
            className="text-gray-700 hover:underline hover:text-black"
          >
            Home
          </NavLink>
          <NavLink
            to="/blog"
            className="text-gray-700 hover:underline hover:text-black"
          >
            Blogs
          </NavLink>
        </div>
      </div>

      {/* Center - Logo */}
      <div className="font-bold text-3xl text-[#143117]">GlowCure</div>

      {/* Right Side - Auth Buttons */}
      <div className="hidden lg:flex items-center gap-5 text-lg font-medium">
        {user ? (
          // <button
          //   onClick={handleLogout}
          //   className="text-gray-700 hover:underline hover:text-black"
          // >
          //   Logout
          // </button>
          <LogoutPopup onLogout={handleLogout} /> // Insert LogoutPopup here
        ) : (
          <NavLink
            to="/signup"
            className="text-gray-700 hover:underline hover:text-black"
          >
            Signup
          </NavLink>
        )}
        <NavLink
          to="/liked"
          className="text-gray-700 hover:underline hover:text-black"
        >
          <FaRegHeart className="cursor-pointer text-gray-700 text-2xl hover:text-black" />
        </NavLink>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 w-full min-h-max bg-[#A2C0A7] shadow-lg p-6 flex flex-col items-center gap-4 rounded transition-transform duration-300 ease-in-out font-medium text-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden z-40`}
      >
        <NavLink
          to="/"
          className="text-gray-700 hover:underline hover:text-black"
          onClick={() => setIsOpen(true)}
        >
          Home
        </NavLink>
        <NavLink
          to="/blog"
          className="text-gray-700 hover:underline hover:text-black"
          onClick={() => setIsOpen(true)}
        >
          Blog
        </NavLink>
        {user ? (
          // <button
          //   onClick={handleLogout}
          //   className="text-gray-700 hover:underline hover:text-black"
          // >
          //   Logout
          // </button>
          <LogoutPopup onLogout={handleLogout} /> // Insert LogoutPopup here
        ) : (
          <NavLink
            to="/signup"
            className="text-gray-700 hover:underline hover:text-black"
            onClick={() => setIsOpen(true)}
          >
            Signup
          </NavLink>
        )}
        <NavLink
          to="/liked"
          className="text-gray-700 hover:underline hover:text-black"
          onClick={() => setIsOpen(true)}
        >
          Liked
        </NavLink>
      </div>
    </nav>
  );
}
