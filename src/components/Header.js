import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { FiUser, FiLogOut, FiHome, FiSettings, FiMessageSquare, FiChevronDown, FiGlobe } from "react-icons/fi";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../Images/logo5.png";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Use the useTranslation hook

  // Language switch handler
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language using i18next
    setIsLanguageMenuOpen(false); // Close the language menu
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  const menuVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: -20 }
  };

  const mobileMenuVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "100%" }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 transition-transform hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link" >
            <FiHome className="nav-icon" style={{margin:"0 8px 0 0"}}   /> {t("home")} {/* Use t() for translations */}
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="nav-link flex items-center"
            >
              <FiSettings className="nav-icon" /> 
              <span>{t("features")}</span> {/* Use t() for translations */}
              <FiChevronDown className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-xl py-3 w-56"
                >
                  <Link to="/services" className="dropdown-item">
                    {t("generateDietPlan")}
                  </Link>
                  <Link to="/MedicineSchedule" className="dropdown-item">
                    {t("dietPlanner")}
                  </Link>
                  <Link to="/recipe" className="dropdown-item">
                    {t("healthChat")}
                  </Link>
                  <Link to="/SkinDiseaseClassifier" className="dropdown-item">
                    {t("SkinDiseaseClassifier")}
                  </Link>
                  <Link to="/ChatPage" className="dropdown-item">
                    {t("ChatPageWord")}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className="nav-link" >
            <FiUser className="nav-icon"  style={{margin:"0 8px 0 0"}}/> {t("about")}
          </Link>
          <Link to="/feedback" className="nav-link">
            <FiMessageSquare className="nav-icon" style={{margin:"0 8px 0 0"}} /> {t("feedback")}
          </Link>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <FiGlobe className="text-xl text-gray-600" />
            </button>

            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl py-2 w-32"
                >
                  <button
                    onClick={() => changeLanguage("ar")}
                    className="w-full px-4 py-2 text-left hover:bg-sky-50"
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className="w-full px-4 py-2 text-left hover:bg-sky-50"
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/userInfo")}
                className="flex items-center space-x-2 bg-sky-50 px-4 py-2 rounded-xl hover:bg-sky-100 transition"
              >
                <FiUser className="text-sky-600" />
                <span className="text-gray-700">{t("profile")}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition"
              >
                <FiLogOut className="text-red-600" />
                <span className="text-gray-700">{t("logout")}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sky-600 font-medium border-2 border-sky-600 rounded-xl hover:bg-sky-600 hover:text-white transition"
              >
                {t("login")}
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition"
              >
                {t("signUp")}
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isMenuOpen ? (
            <RiCloseLine className="text-2xl text-gray-700" />
          ) : (
            <RiMenu3Line className="text-2xl text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 md:hidden bg-white z-40"
            
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <RiCloseLine className="text-2xl text-gray-700" />
            </button>

            {/* Mobile Menu Content */}
            <nav className="flex flex-col  p-6 space-y-6  bg-white">
              {/* Logo and Close Button */}
              <div className="flex justify-between items-center mb-6">
                <Link to="/" className="flex items-center">
                  <img src={logo} alt="Logo" className="h-10" />
                </Link>
              </div>

              {/* Menu Items */}
              <Link to="/" className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-200 hover:bg-cyan-300  transition">
                <FiHome className="text-xl text-gray-700" />
                <span className="text-gray-700 font-medium">{t("home")}</span>
              </Link>
              <Link to="/services" className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-200 hover:bg-cyan-300  transition">
                <FiSettings className="text-xl text-gray-700" />
                <span className="text-gray-700 font-medium">{t("services")}</span>
              </Link>
              <Link to="/about" className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-200 hover:bg-cyan-300  transition">
                <FiUser className="text-xl text-gray-700" />
                <span className="text-gray-700 font-medium">{t("about")}</span>
              </Link>
              <Link to="/feedback" className="flex items-center space-x-4 p-4 rounded-lg bg-cyan-200 hover:bg-cyan-300  transition">
                <FiMessageSquare className="text-xl text-gray-700" />
                <span className="text-gray-700 font-medium">{t("feedback")}</span>
              </Link>

              {/* Language Switcher */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-gray-500 text-sm font-medium mb-4">{t("language")}</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => changeLanguage("ar")}
                    className={`px-4 py-2 rounded-lg ${i18n.language === "ar" ? 'bg-sky-600 text-white' : 'bg-gray-100'}`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-4 py-2 rounded-lg ${i18n.language === "en" ? 'bg-sky-600 text-white' : 'bg-gray-100'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Auth Section */}
              {user ? (
                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={() => navigate("/userInfo")}
                    className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FiUser className="text-xl text-gray-700" />
                    <span className="text-gray-700 font-medium">{t("profile")}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <FiLogOut className="text-xl text-gray-700" />
                    <span className="text-gray-700 font-medium">{t("logout")}</span>
                  </button>
                </div>
              ) : (
                <div className="pt-6 border-t border-gray-100">
                  <Link
                    to="/login"
                    className="block w-full text-center p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center p-4 bg-gradient-to-r from-sky-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition mt-4"
                  >
                    {t("signUp")}
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;