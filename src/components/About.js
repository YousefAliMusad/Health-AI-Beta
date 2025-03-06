import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const About = () => {
  const { t } = useTranslation(); // Use the useTranslation hook

  return (
    <div style={{ marginTop: "80px" }}>
      <section className="bg-gradient-to-r from-blue-700 to-purple-600 py-24 px-6 md:px-16 lg:px-40 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-40 bg-black backdrop-blur-md"></div>
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg text-yellow-300 animate-pulse">
            {t("aboutMe")} {/* Use t() for translations */}
          </h2>

          <motion.p
            className="text-lg md:text-xl leading-relaxed font-light drop-shadow-md text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("aboutDescription1")} {/* Use t() for translations */}
          </motion.p>

          <motion.p
            className="mt-6 text-lg md:text-xl leading-relaxed font-light drop-shadow-md text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t("aboutDescription2")} {/* Use t() for translations */}
          </motion.p>

          <motion.p
            className="mt-6 text-lg md:text-xl leading-relaxed font-light drop-shadow-md text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t("aboutMission")} {/* Use t() for translations */}
          </motion.p>

          <motion.p
            className="mt-6 text-lg md:text-xl leading-relaxed font-light drop-shadow-md text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {t("aboutCollaboration")} {/* Use t() for translations */}
          </motion.p>

          <div className="mt-10">
            <motion.a
              href="#contact"
              className="bg-yellow-400 text-gray-900 py-4 px-10 rounded-full text-xl font-bold shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-yellow-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("getInTouch")} {/* Use t() for translations */}
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="mt-10 text-sm text-gray-400">
            {t("copyright2")} {/* Use t() for translations */}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
