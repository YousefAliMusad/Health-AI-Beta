import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Section3 = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  return (
    <section className="py-32 bg-gradient-to-r from-indigo-800 via-indigo-600 to-blue-800 text-white">
      <div className="container mx-auto text-center px-6 md:px-12">
        {/* Title */}
        <h2 className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-wider mb-10 sm:mb-14 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          {t("transformYourHealth")} {/* Use t() for translations */}
          <br />
          <span>
            {t("createYourPersonalizedDietPlanToday")} {/* Use t() for translations */}
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl mb-16 px-6 sm:px-20 lg:px-32 opacity-90 max-w-4xl mx-auto text-gray-100">
          {t("healthAIDescription")} {/* Use t() for translations */}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-8 flex-wrap">
          {/* Make Diet Plan Button */}
          <a
            href="/services"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-800 py-4 px-12 text-2xl sm:text-3xl font-semibold rounded-full shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:bg-yellow-400"
          >
            {t("makeMyDietPlan")} {/* Use t() for translations */}
          </a>

          {/* Try Now Button */}
          <a
            href="#"
            className="bg-transparent border-2 border-white text-white py-4 px-12 text-2xl sm:text-3xl font-semibold rounded-full shadow-2xl transition-all duration-500 ease-in-out transform hover:bg-white hover:text-gray-800 hover:scale-110 hover:shadow-2xl"
          >
            {t("tryNow")} {/* Use t() for translations */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Section3;