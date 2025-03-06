import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DietForm from './components/DietForm';
import DietPlan from './components/DietPlan';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingPage from './components/LoadingPage';
import ChatPage from './components/ChatPage';
import UserInfo from './components/UserInfoAcount';
import { DietPlanProvider } from './components/DietPlanContext';
import { PremiumProvider } from './components/PremiumContext';
import { Signup, Login } from './components/BackendAuth';
import PrivateRoute from './components/PrivateRoute';
import FeedbackPage from './components/Feedback';
import SubscriptionPage from './components/SubscriptionPage';
import RecipeHome from "./components/RecipeHome";
import RecipeDetails from "./components/RecipeDetails";
import MedicineSchedule from "./components/MedicineSchedule";
import ImageAnalysis from './components/ImageAnalysis';
import SkinDiseaseClassifier from './components/SkinDiseaseClassifier';


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();



  // Loading state for route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Header />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<PrivateRoute element={<DietForm />} />} />
          <Route path="/about" element={<About />} />
          <Route path="/DietPlan" element={<DietPlan />} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/recipe" element={<RecipeHome />} />
          <Route path="/MedicineSchedule" element={<MedicineSchedule />} />
          <Route path="/SkinDiseaseClassifier" element={<SkinDiseaseClassifier />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      )}
      <Footer />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <DietPlanProvider>
      <PremiumProvider>
        <App />
      </PremiumProvider>
    </DietPlanProvider>
  </Router>
);

export default AppWrapper;