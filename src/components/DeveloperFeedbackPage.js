import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import Firebase Firestore
import { collection, getDocs } from "firebase/firestore";
import { auth } from "./firebase"; // Import Firebase Auth
import { useNavigate } from "react-router-dom";

const DeveloperFeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]); // State to store feedback data
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();

  // Function to fetch feedback data
  const fetchFeedback = async () => {
    try {
      const feedbackRef = collection(db, "feedback");
      const snapshot = await getDocs(feedbackRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeedbackData(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is the developer
  const isDeveloper = () => {
    const user = auth.currentUser;
    return user && user.email === "developer@example.com"; // Replace with the developer's email
  };

  useEffect(() => {
    if (!isDeveloper()) {
      navigate("/"); // Redirect non-developers to the home page
    } else {
      fetchFeedback(); // Fetch feedback data if the user is the developer
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Feedback Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Comment</th>
                <th className="px-4 py-2 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback) => (
                <tr key={feedback.id} className="border-b">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      {Array.from({ length: feedback.rating }, (_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{feedback.comment}</td>
                  <td className="px-4 py-2">
                    {new Date(feedback.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeveloperFeedbackPage;