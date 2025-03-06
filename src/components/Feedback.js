import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa"; // Star icons for rating
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const FeedbackPage = () => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const [rating, setRating] = useState(0); // State for rating (1–5 stars)
  const [comment, setComment] = useState(""); // State for feedback comment
  const [submitted, setSubmitted] = useState(false); // State to track if feedback is submitted
  const navigate = useNavigate();

  // Handle rating selection
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert(t("selectRatingAlert")); // Use t() for translations
      return;
    }

    try {
      console.log("Submitting feedback...");

      // Save feedback to Firestore
      const feedbackRef = await addDoc(collection(db, "feedback"), {
        rating: rating,
        comment: comment,
        timestamp: new Date().toISOString(), // Add a timestamp
      });

      console.log("Feedback submitted with ID:", feedbackRef.id);

      // Show success message
      setSubmitted(true);

      // Reset form after submission
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(t("feedbackSubmissionError")); // Use t() for translations
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          {t("feedback")} 
        </h2>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xl font-semibold text-green-600 mb-4">
              {t("thankYouForFeedback")} {/* Use t() for translations */}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
            >
              {t("goBackToHome")} {/* Use t() for translations */}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div>
              <label className="block text-lg font-semibold text-center text-gray-800 mb-2">
                {t("rateYourExperience")} {/* Use t() for translations */}
              </label>
              <div className="flex space-x-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-4xl ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-500 transition`}
                  >
                    <FaStar />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                {t("yourFeedback")} {/* Use t() for translations */}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("feedbackPlaceholder")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition transform"
            >
              {t("submitFeedback")} {/* Use t() for translations */}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackPage;