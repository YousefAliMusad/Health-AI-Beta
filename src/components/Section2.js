import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Section2 = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  return (
    <section className="py-28 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600" id="health-ai-features">
      <div className="container mx-auto text-center px-6 md:px-12">
        {/* Title */}
        <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-12 leading-tight tracking-wide">
          {t("keyFeaturesOfHealthAI")} {/* Use t() for translations */}
        </h2>

        {/* 5-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {/* Column 1 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-400 ease-in-out group">
            <div className="text-teal-500 text-4xl mb-6 group-hover:text-teal-600 transition-all duration-300 ease-in-out">
              <i className="fas fa-brain"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 transition-all duration-300 ease-in-out group-hover:text-teal-600">
              {t("aiPoweredDiagnostics")} {/* Use t() for translations */}
            </h3>
            <p className="text-lg text-gray-700 group-hover:text-gray-800 transition-all duration-300 ease-in-out">
              {t("aiPoweredDiagnosticsDescription")} {/* Use t() for translations */}
            </p>
          </div>

          {/* Column 2 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-400 ease-in-out group">
            <div className="text-blue-500 text-4xl mb-6 group-hover:text-blue-600 transition-all duration-300 ease-in-out">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 transition-all duration-300 ease-in-out group-hover:text-blue-600">
              {t("predictiveAnalytics")} {/* Use t() for translations */}
            </h3>
            <p className="text-lg text-gray-700 group-hover:text-gray-800 transition-all duration-300 ease-in-out">
              {t("predictiveAnalyticsDescription")} {/* Use t() for translations */}
            </p>
          </div>

          {/* Column 3 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-400 ease-in-out group">
            <div className="text-indigo-500 text-4xl mb-6 group-hover:text-indigo-600 transition-all duration-300 ease-in-out">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 transition-all duration-300 ease-in-out group-hover:text-indigo-600">
              {t("personalizedTreatment")} {/* Use t() for translations */}
            </h3>
            <p className="text-lg text-gray-700 group-hover:text-gray-800 transition-all duration-300 ease-in-out">
              {t("personalizedTreatmentDescription")} {/* Use t() for translations */}
            </p>
          </div>

          {/* Column 4 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-400 ease-in-out group">
            <div className="text-purple-500 text-4xl mb-6 group-hover:text-purple-600 transition-all duration-300 ease-in-out">
              <i className="fas fa-flask"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 transition-all duration-300 ease-in-out group-hover:text-purple-600">
              {t("advancedResearch")} {/* Use t() for translations */}
            </h3>
            <p className="text-lg text-gray-700 group-hover:text-gray-800 transition-all duration-300 ease-in-out">
              {t("advancedResearchDescription")} {/* Use t() for translations */}
            </p>
          </div>

          {/* Column 5 */}
          <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 hover:shadow-2xl transition-all duration-400 ease-in-out group">
            <div className="text-red-500 text-4xl mb-6 group-hover:text-red-600 transition-all duration-300 ease-in-out">
              <i className="fas fa-cogs"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4 transition-all duration-300 ease-in-out group-hover:text-red-600">
              {t("automatedHealthcareSystems")} {/* Use t() for translations */}
            </h3>
            <p className="text-lg text-gray-700 group-hover:text-gray-800 transition-all duration-300 ease-in-out">
              {t("automatedHealthcareSystemsDescription")} {/* Use t() for translations */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;