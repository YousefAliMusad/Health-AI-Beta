import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import backgroundImage from '../Images/back4.jpg';

const IsLoading = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  return (
    <div>
      <div 
        className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundAttachment: 'fixed' }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-300 rounded-full blur-[200px] opacity-40 -translate-x-24 -translate-y-24"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[200px] opacity-40 translate-x-24 translate-y-24"></div>
        </div>

        {/* Header Section */}
        <header className="text-center mb-16 relative z-10">
          <h1 className="text-7xl font-extrabold text-gray-900 leading-snug tracking-tighter">
            {t("elevateYourWellnessJourney")} {/* Use t() for translations */}
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {t("discoverTailoredDietPlans")} {/* Use t() for translations */}
          </p>
        </header>

        {/* Call to Action Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Get Started Button */}
          <button
            className={`bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-12 rounded-full shadow-lg transition-all duration-700 transform hover:scale-105 hover:shadow-md hover:ring-4 hover:ring-green-300 focus:outline-none focus:ring-4 focus:ring-green-300`}
          >
            <Link to="/services">
              {t("getStarted")} {/* Use t() for translations */}
            </Link>
          </button>

          {/* Learn More Button */}
          <button 
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border border-gray-300 text-gray-700 font-semibold py-4 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:ring-4 hover:ring-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            {t("learnMore")} {/* Use t() for translations */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsLoading;