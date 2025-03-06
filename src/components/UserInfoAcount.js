import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaCalendarAlt, FaFire, FaUtensils, FaCrown, FaLeaf } from "react-icons/fa";
import { usePremium } from "./PremiumContext"; // Import usePremium
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const UserInfo = () => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const [user, setUser] = useState(null);
  const [dietPlan, setDietPlan] = useState(t("noDietPlanAvailable")); // Use t() for translations
  const [userName, setUserName] = useState("N/A");
  const [dietPlanDate, setDietPlanDate] = useState(t("noDateAvailable")); // Use t() for translations
  const [streak, setStreak] = useState(0);
  const { isPremium } = usePremium(); // Use isPremium from context
  const navigate = useNavigate();

  // Function to calculate the streak
  const calculateStreak = (dietPlanDate) => {
    if (!dietPlanDate) return 0;

    const currentDate = new Date();
    const dietDate = new Date(dietPlanDate);
    const timeDifference = currentDate - dietDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        console.log("User Data Fetched:", userDoc.data());

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setDietPlan(userData.dietPlan || t("noDietPlanAvailable")); // Use t() for translations
          setUserName(userData.name || "N/A");
          setDietPlanDate(userData.dietPlanDate || t("noDateAvailable")); // Use t() for translations
          setStreak(calculateStreak(userData.dietPlanDate));
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, t]);

  // Function to format the diet plan text
  const formatDietPlan = (dietPlan) => {
    if (!dietPlan) return t("noDietPlanAvailable"); // Use t() for translations

    const sections = dietPlan.split("\n\n");
    return sections.map((section, index) => {
      const [title, ...content] = section.split("\n");
      return (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <h4 className="text-xl font-semibold text-purple-600 flex items-center">
            <FaUtensils className="mr-2" /> {title}
          </h4>
          <div className="mt-2 space-y-2">
            {content.map((line, i) => (
              <p key={i} className="text-gray-700">
                {line}
              </p>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 py-8" style={{ marginTop: "100px" }}>
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          {t("userInformation")} {/* Use t() for translations */}
        </h2>
        {user ? (
          <div className="space-y-6">
            {/* Membership Status Card */}
            <div className={`bg-gradient-to-r ${isPremium ? "from-yellow-100 to-orange-100" : "from-green-100 to-teal-100"} p-6 rounded-xl shadow-sm`}>
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${isPremium ? "bg-yellow-500" : "bg-green-500"}`}>
                  {isPremium ? (
                    <FaCrown className="text-white text-2xl" />
                  ) : (
                    <FaLeaf className="text-white text-2xl" />
                  )}
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {t("membershipStatus")} {/* Use t() for translations */}
                  </p>
                  <p className={`text-lg font-medium ${isPremium ? "text-yellow-700" : "text-green-700"}`}>
                    {isPremium ? t("premiumMember") : t("freeMember")} {/* Use t() for translations */}
                  </p>
                  <p className="text-gray-600">
                    {isPremium ? t("premiumMemberDescription") : t("freeMemberDescription")} {/* Use t() for translations */}
                  </p>
                </div>
              </div>
            </div>

            {/* User Details Card */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {t("username")} {/* Use t() for translations */}
                  </p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Diet Plan Details Card */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500 p-3 rounded-full">
                    <FaCalendarAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {t("dietPlanDate")} {/* Use t() for translations */}
                    </p>
                    <p className="text-gray-600">{dietPlanDate}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-red-500 p-3 rounded-full">
                    <FaFire className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      {t("streak")} {/* Use t() for translations */}
                    </p>
                    <p className="text-gray-600" data-ar={`${streak} يوم${streak !== 1 ? "ًا" : ""}`} data-en={`${streak} day${streak !== 1 ? "s" : ""} streak`}>
                  {streak} day{streak !== 1 ? "s" : ""} 
                </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diet Plan Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-sky-600 mb-4 flex items-center">
                <FaUtensils className="mr-2" /> {t("dietPlan")} {/* Use t() for translations */}
              </h3>
              <div className="space-y-4">{formatDietPlan(dietPlan)}</div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            {t("loading")} {/* Use t() for translations */}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInfo;