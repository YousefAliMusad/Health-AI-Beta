// PremiumContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const PremiumContext = createContext();

export const PremiumProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsPremium(userDoc.data().subscription?.status === 'active');
        }
      }
    };

    checkPremiumStatus();
    const unsubscribe = auth.onAuthStateChanged(checkPremiumStatus);
    return () => unsubscribe();
  }, []);

  return (
    <PremiumContext.Provider value={{ isPremium, setIsPremium }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => useContext(PremiumContext);