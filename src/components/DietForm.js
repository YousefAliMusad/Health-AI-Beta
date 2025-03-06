import { motion } from "framer-motion";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import "../DietForm.css";
import { DietPlanContext } from './DietPlanContext';
import { doc, setDoc } from "firebase/firestore"; // Combined imports
import { auth, db } from "./firebase"; // Ensure you have firebase initialized
import { usePremium } from './PremiumContext';
import { useTranslation } from "react-i18next"; // Import useTranslation hook

export default function DietForm() {
  const { isPremium } = usePremium();
  const { t } = useTranslation(); // Use the useTranslation hook
  const navigate = useNavigate();
  const { setDietPlan } = useContext(DietPlanContext);

  const [formData, setFormData] = useState({
    language: "",
    weight: "",
    height: "",
    age: "",
    preferredFoods: "",
    fitnessGoals: "",
    foodallergies: "",
    gender: "",
    medicalhistory: "",
    sportactivity: "",
    activitylevel: "",
    extranotes: "",
    inbodyFile: null,
    inbodyText: "",
  });

  const inbodyTextRef = useRef(""); // Ref to store the extracted text
  const [loading, setLoading] = useState(false);
  const [isTextExtracted, setIsTextExtracted] = useState(false); // New state to track if text extraction is complete
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Disable the button during text extraction

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpgradeClick = () => {
    navigate('/subscription'); // Create a subscription page
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, inbodyFile: file }));
    setIsButtonDisabled(true); // Disable the button during text extraction

    try {
      const text = await extractTextFromImage(file);
      console.log("Extracted Text from File:", text);

      // Update the ref with the extracted text
      inbodyTextRef.current = text;

      // Update the state and wait for it to complete
      await new Promise((resolve) => {
        setFormData((prev) => ({ ...prev, inbodyText: text }));
        resolve();
      });

      setIsTextExtracted(true); // Mark the text as extracted
      return text; // Return the extracted text
    } catch (error) {
      console.error("Error extracting text from image:", error);
      return ""; // Return an empty string if extraction fails
    } finally {
      setIsButtonDisabled(false); // Re-enable the button after extraction
    }
  };

  const extractTextFromImage = async (file) => {
    return new Promise((resolve) => {
      Tesseract.recognize(file, "eng")
        .then(({ data: { text } }) => {
          console.log("Extracted Text from Image:", text); // Log the extracted text
          resolve(text);
        })
        .catch(() => resolve(""));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsButtonDisabled(true); // Disable the button during processing

    const user = auth.currentUser;
    if (!user) {
      alert(t("loginRequired")); // Use t() for translations
      setLoading(false);
      setIsButtonDisabled(false);
      return;
    }

    // Check if a file is uploaded
    const isFileUploaded = !!formData.inbodyFile;

    // Validate required fields based on whether a file is uploaded
    if (isFileUploaded && (!formData.fitnessGoals || !formData.activitylevel)) {
      alert(t("requiredFieldsForFileUpload")); // Use t() for translations
      setIsButtonDisabled(false); // Re-enable the button
      setLoading(false);
      return;
    }

    let extractedText = "";

    // If a file is uploaded, wait for text extraction to complete
    if (isFileUploaded) {
      try {
        console.log("Extracting text from file...");
        extractedText = await handleFileChange({ target: { files: [formData.inbodyFile] } });
      } catch (error) {
        console.error("Error during text extraction:", error);
        setIsButtonDisabled(false);
        setLoading(false);
        return;
      }
    }

    // Log the inbodyText to ensure it's updated
    console.log("InBody Text:", inbodyTextRef.current);

    // Construct the prompt text
    const promptText = `Generate a diet plan for:
      - Language: ${formData.language}
      - Weight: ${formData.weight} kg
      - Height: ${formData.height} cm
      - Age: ${formData.age}
      - Fitness Goal: ${formData.fitnessGoals || "Not provided"}
      - Preferred Foods: ${formData.preferredFoods}
      - Food Allergies: ${formData.foodallergies}
      - Medical History: ${formData.medicalhistory}
      - Gender: ${formData.gender}
      - Sport Activity: ${formData.sportactivity}
      - Activity Level: ${formData.activitylevel || "Not provided"}
      - Extra Notes: ${formData.extranotes}
      - InBody Analysis: ${inbodyTextRef.current || "Not provided"} <!-- Use the ref value -->
      Include breakfast, lunch, dinner, and snacks based on the InBody analysis if provided. and Write the all Client Data,
      Don't say that you are AI.
      `;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDmQ5XQV7gwYyYHwRwdSsjdDef_V-gM9Ug",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptText,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      console.log("AI Response:", data); // Log the AI response

      if (data && data.candidates && data.candidates[0]) {
        const dietPlan = data.candidates[0].content.parts[0].text;
        setDietPlan(dietPlan); // Store the diet plan in context

        const user = auth.currentUser;
        if (user) {
          const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY/MM/DD format
          await setDoc(doc(db, "users", user.uid), {
            dietPlan: dietPlan,
            dietPlanDate: currentDate, // Save the current date
          }, { merge: true }); // Merge with existing data
        }

        navigate("/DietPlan", { state: { dietPlan: data.candidates[0] } });
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error generating diet plan:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false
      setIsButtonDisabled(false); // Enable the button after the process
    }
  };

  return (
    <div className="diet-form-container flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 py-8" style={{ marginTop: "72px" }}>
      <div className="diet-form-card bg-white shadow-2xl rounded-xl w-full max-w-lg p-8" style={{ marginTop: "25px", marginBottom: "50px" }}>
        <h1 className="diet-form-title text-4xl font-extrabold text-center text-gray-800 mb-6">
          {t("generateYourDietPlan")} {/* Use t() for translations */}
        </h1>
        <form className="diet-form space-y-6" onSubmit={handleSubmit}>
          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("language")} {/* Use t() for translations */}
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="">{t("chooseTheLanguage")}</option>
              <option value="english">{t("english")}</option>
              <option value="arabic">{t("arabic")}</option>
              <option value="spanish">{t("spanish")}</option>
              <option value="french">{t("french")}</option>
              <option value="german">{t("german")}</option>
              <option value="italian">{t("italian")}</option>
              <option value="portuguese">{t("portuguese")}</option>
            </select>
          </motion.div>

          {/* Weight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("weightKg")} {/* Use t() for translations */}
            </label>
            <input
              type="number"
              name="weight"
              placeholder={t("enterYourWeight")}
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Height */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("heightCm")} {/* Use t() for translations */}
            </label>
            <input
              type="number"
              name="height"
              placeholder={t("enterYourHeight")}
              value={formData.height}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Age */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("age")} {/* Use t() for translations */}
            </label>
            <input
              type="number"
              name="age"
              placeholder={t("enterYourAge")}
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Gender */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("gender")} {/* Use t() for translations */}
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="">{t("chooseYourGender")}</option>
              <option value="male">{t("male")}</option>
              <option value="female">{t("female")}</option>
            </select>
          </motion.div>

          {/* Activity Level */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("activityLevel")} {/* Use t() for translations */}
            </label>
            <select
              name="activitylevel"
              value={formData.activitylevel}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="">{t("chooseYourActivityLevel")}</option>
              <option value="sedentary">{t("sedentary")}</option>
              <option value="moderate">{t("moderate")}</option>
              <option value="active">{t("active")}</option>
            </select>
          </motion.div>

          {/* Fitness Goals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("fitnessGoals")} {/* Use t() for translations */}
            </label>
            <select
              name="fitnessGoals"
              value={formData.fitnessGoals}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="">{t("chooseYourFitnessGoal")}</option>
              <option value="muscle_gain">{t("muscleGain")}</option>
              <option value="weight_loss">{t("weightLoss")}</option>
              <option value="maintenance">{t("maintenance")}</option>
              <option value="weight_gain">{t("weightGain")}</option>
              <option value="improve_strength">{t("improvingStrength")}</option>
              <option value="boosting_energy">{t("boostingEnergy")}</option>
              <option value="faster_recovery">{t("fasterRecovery")}</option>
              <option value="improving_heart_health">{t("improvingHeartHealth")}</option>
              <option value="boosting_immune_system">{t("boostingImmuneSystem")}</option>
              <option value="enhancing_focus_and_brain">{t("enhancingFocusAndBrain")}</option>
            </select>
          </motion.div>

          {/* Sport Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("sportActivity")} {/* Use t() for translations */}
            </label>
            <input
              type="text"
              name="sportactivity"
              value={formData.sportactivity}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Preferred Foods */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("preferredFoods")} {/* Use t() for translations */}
            </label>
            <input
              type="text"
              name="preferredFoods"
              value={formData.preferredFoods}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Food Allergies */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("foodAllergies")} {/* Use t() for translations */}
            </label>
            <input
              type="text"
              name="foodallergies"
              value={formData.foodallergies}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Medical History */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("medicalHistory")} {/* Use t() for translations */}
            </label>
            <input
              type="text"
              name="medicalhistory"
              value={formData.medicalhistory}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* Extra Notes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <label className="block font-semibold text-gray-700">
              {t("extraNotes")} {/* Use t() for translations */}
            </label>
            <input
              type="text"
              name="extranotes"
              value={formData.extranotes}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
            />
          </motion.div>

          {/* InBody File Upload */}
          <motion.div className="space-y-2">
            <label className="block font-semibold text-gray-700">
              {t("uploadInBodyAnalysis")} {!isPremium && `(${t("premiumFeature")})`}
            </label>
            {isPremium ? (
              <input
                type="file"
                name="inbodyFile"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition-all duration-300"
              />
            ) : (
              <button
                onClick={handleUpgradeClick}
                className="w-full p-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors"
              >
                {t("upgradeToPremiumToUploadFiles")}
              </button>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-2"
          >
            <button
              className="w-full p-4 bg-teal-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-teal-700 transform hover:scale-105 disabled:bg-gray-300"
              type="submit"
              disabled={
                loading ||
                !formData.language ||
                !formData.weight ||
                !formData.height ||
                !formData.age ||
                !formData.gender ||
                (formData.inbodyFile && (!formData.fitnessGoals || !formData.activitylevel)) // Conditionally require fitnessGoals and activitylevel
              }
              style={{ display: "flex", justifyContent: "center" }}
            >
              {loading ? (
                <div className="lds-ring text-center">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                t("generateDietPlan2") // Use t() for translations
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}