import { createContext, useState } from "react";

export const DietPlanContext = createContext();

export const DietPlanProvider = ({ children }) => {
  const [dietPlan, setDietPlan] = useState(null); // Start as null for dynamic updates

  return (
    <DietPlanContext.Provider value={{ dietPlan, setDietPlan }}>
      {children}
    </DietPlanContext.Provider>
  );
};
