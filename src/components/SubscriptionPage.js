import React, { useEffect, useState } from 'react';
import { usePremium } from './PremiumContext';
import { FaCrown, FaCheckCircle, FaRocket, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import "../SubscriptionPage.css";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const SubscriptionPage = () => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const { isPremium, setIsPremium } = usePremium();

  const handleSubscription = (plan) => {
    setIsPremium(true);
  };

  return (
    <div className="subscription-page" style={{ marginTop: "100px" }}>
      <div className="header-section">
        <h1 className="main-heading">
          {t("unlockPremiumFeatures")} {/* Use t() for translations */}
        </h1>
        <p className="sub-heading">
          {t("elevateYourExperience")} {/* Use t() for translations */}
        </p>
      </div>

      <div className="plans-container">
        <div className="plan-card glow-card">
          <div className="plan-header">
            <FaCrown className="plan-icon" />
            <h2 className="plan-title">
              {t("premiumPro")} {/* Use t() for translations */}
            </h2>
            <div className="price-container">
              <span className="price-currency">$</span>
              <span className="price-amount">
                {t("priceAmount")} {/* Use t() for translations */}
              </span>
              <span className="price-duration">
                {t("priceDuration")} {/* Use t() for translations */}
              </span>
            </div>
          </div>

          <ul className="features">
            <li>
              <FaCheckCircle className="feature-icon" />
              {t("unlimitedFileUploads")} {/* Use t() for translations */}
            </li>
            <li>
              <FaRocket className="feature-icon" />
              {t("priorityAIProcessing")} {/* Use t() for translations */}
            </li>
            <li>
              <FaShieldAlt className="feature-icon" />
              {t("advancedSecurity")} {/* Use t() for translations */}
            </li>
            <li>
              <FaHeadset className="feature-icon" />
              {t("premiumSupport")} {/* Use t() for translations */}
            </li>
            <li>
              <FaCheckCircle className="feature-icon" />
              {t("pdfExportsDownloads")} {/* Use t() for translations */}
            </li>
          </ul>

          <button
            className="subscribe-button"
            onClick={() => handleSubscription('premium')}
          >
            {t("getStartedNow")} {/* Use t() for translations */}
          </button>
        </div>
      </div>

      {isPremium && (
        <div className="premium-status pulse">
          <FaCrown className="status-icon" />
          <p>
            {t("premiumBenefitsMessage")} {/* Use t() for translations */}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;