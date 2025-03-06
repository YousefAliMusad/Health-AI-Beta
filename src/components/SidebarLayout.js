import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { FiUser, FiLogOut, FiHome, FiSettings, FiMessageSquare } from "react-icons/fi";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../Images/logo5.png";

const SidebarLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState("ar");

  // Language switch logic (same as before)
  useEffect(() => { /* ... */ }, [currentLang]);

  // Logout logic (same as before)
  const handleLogout = () => { /* ... */ };

  return (
    <div className="flex min-h-screen">
      {/* --- Sidebar (Left Section) --- */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30">
        {/* Sidebar content (same as before) */}
        <div className="flex flex-col h-full p-4">
          <Link to="/" className="flex items-center justify-center mb-8">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
          <nav className="flex-1 space-y-4">{/* Navigation links */}</nav>
          {/* Language switcher & auth buttons */}
        </div>
      </aside>

      {/* --- Main Content (Right Section) --- */}
      <main className="flex-1 ml-64"> {/* ml-64 offsets content by sidebar width */}
        {/* Optional Header inside Main Content */}
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800"
            >
              {isMenuOpen ? <RiCloseLine className="text-3xl" /> : <RiMenu3Line className="text-3xl" />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children} {/* This is where your page content will be rendered */}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;