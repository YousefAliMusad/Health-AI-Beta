import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth, db } from './firebase'; // ✅ Use the separate firebase.js file
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// Sign Up function
export const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's profile with their name
    await updateProfile(user, {
      displayName: name,
    });

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      uid: user.uid,
      dietPlan: "", // Initialize with an empty diet plan
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Sign In function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign Out function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Authentication Form Component
const AuthForm = ({ isSignup }) => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signUp(name, email, password);
        alert(t("signupSuccessful")); // Use t() for translations
        navigate("/services");
      } else {
        await signIn(email, password);
        navigate("/services");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignup ? t("signUp") : t("logIn")} {/* Use t() for translations */}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            placeholder={t("emailPlaceholder")} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder={t("passwordPlaceholder")} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {isSignup ? t("signUp") : t("logIn")} {/* Use t() for translations */}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <p className="text-center text-gray-600 mt-4">
          {isSignup ? t("alreadyHaveAccount") : t("dontHaveAccount")}{' '}
          <Link to={isSignup ? '/login' : '/signup'} className="text-blue-500">
            {isSignup ? t("logIn") : t("signUp")} {/* Use t() for translations */}
          </Link>
        </p>
      </div>
    </div>
  );
};

// Export Signup & Login Components
export const Signup = () => <AuthForm isSignup={true} />;
export const Login = () => <AuthForm isSignup={false} />;