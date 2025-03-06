import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Footer = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-blue-800 py-20 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Logo and Description */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 sm:mb-16">
          <div className="flex items-center space-x-4 mb-6 sm:mb-0">
            <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              {t("healthAI")} {/* Use t() for translations */}
            </span>
          </div>
          <p className="text-lg sm:text-xl text-gray-300 text-center sm:text-left max-w-3xl">
            {t("footerDescription")} {/* Use t() for translations */}
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">
              {t("quickLinks")} {/* Use t() for translations */}
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="/" className="hover:text-yellow-500 transition-all duration-300">
                  {t("home2")} {/* Use t() for translations */}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-500 transition-all duration-300">
                  {t("about2")} {/* Use t() for translations */}
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-yellow-500 transition-all duration-300">
                  {t("services")} {/* Use t() for translations */}
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-yellow-500 transition-all duration-300">
                  {t("privacyPolicy")} {/* Use t() for translations */}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">
              {t("contact")} {/* Use t() for translations */}
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="mailto:info@healthai.com" className="hover:text-yellow-500 transition-all duration-300">
                  info@healthai.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-yellow-500 transition-all duration-300">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">
              {t("followUs")} {/* Use t() for translations */}
            </h3>
            <div className="flex gap-6">
              <a href="#" className="text-3xl hover:text-yellow-500 transition-all duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-3xl hover:text-yellow-500 transition-all duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-3xl hover:text-yellow-500 transition-all duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-3xl hover:text-yellow-500 transition-all duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">
              {t("newsletter")} {/* Use t() for translations */}
            </h3>
            <form action="#" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder={t("enterYourEmail")} 
                className="px-4 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-gray-800 font-semibold py-3 px-8 rounded-full hover:bg-yellow-600 transition-all duration-300"
              >
                {t("subscribe")} {/* Use t() for translations */}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8 flex justify-between items-center text-sm text-gray-300">
          <p>
            {t("copyright")} {/* Use t() for translations */}
          </p>
          <p>
            {t("craftedBy")} {/* Use t() for translations */}
          </p>
        </div>

        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-400 to-transparent opacity-20 z-[-1] blur-sm"></div>
      </div>
    </footer>
  );
};

export default Footer;