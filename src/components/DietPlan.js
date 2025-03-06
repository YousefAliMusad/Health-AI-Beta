import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack, MdChat } from "react-icons/md";
import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink, Image } from "@react-pdf/renderer";
import "../DietPlan.css";
import { amiriFont } from "../components/amiriFont"; // Ensure the correct path and file extension
import logo from "../Images/logo5.png"; // Add a logo for the header
import { usePremium } from './PremiumContext';
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// Register the Amiri font
Font.register({
  family: "Amiri",
  src: amiriFont, // Use the imported font file
});

// Define enhanced styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    backgroundColor: "#FFFFFF", // White background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#2C3E50", // Dark blue border
  },
  logo: {
    width: 150, // Adjust width as needed
    height: "auto", // Maintain aspect ratio
    aspectRatio: 2, // Adjust based on your logo's natural aspect ratio
  },
  title: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#2C3E50", // Dark blue
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Helvetica",
    color: "#7F8C8D", // Gray
    textAlign: "center",
    marginBottom: 20,
  },
  date: {
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#7F8C8D", // Gray
    textAlign: "right",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#2C3E50", // Dark blue
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2C3E50", // Dark blue
    paddingBottom: 5,
  },
  arabicText: {
    fontSize: 14,
    fontFamily: "Amiri",
    color: "#2C3E50", // Dark blue
    textAlign: "right",
    lineHeight: 1.6,
    marginBottom: 10,
  },
  latinText: {
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#2C3E50", // Dark blue
    textAlign: "left",
    lineHeight: 1.6,
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7", // Light gray
    borderRadius: 10,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#BDC3C7", // Light gray
    backgroundColor: "#FFFFFF", // White
  },
  tableRowAlternate: {
    backgroundColor: "#F4F6F6", // Light gray for alternating rows
  },
  tableHeader: {
    backgroundColor: "#2C3E50", // Dark blue
    color: "#FFFFFF", // White
  },
  tableCell: {
    fontSize: 13,
    fontFamily: "Helvetica",
    padding: 8,
    color: "#2C3E50", // Dark blue
  },
  tableCellMeal: {
    flex: 1, // First column takes 1 part of the space
  },
  tableCellDetails: {
    flex: 3, // Second column takes 3 parts of the space (wider)
  },
  tableHeaderCell: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF", // White
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#2C3E50", // Dark blue
    textAlign: "center",
  },
  copyright: {
    fontSize: 15,
    fontFamily: "Helvetica",
    color: "#3e3d3d", // Gray
  },
});

// PDF Component
const DietPlanPDF = ({ dietPlan, currentDate }) => {
  const isArabic = /[\u0600-\u06FF]/.test(dietPlan);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>Your Personalized Diet Plan</Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Designed for Your Health and Wellness</Text>

        {/* Date */}
        <Text style={styles.date}>Date: {currentDate}</Text>

        {/* Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meal Plan Breakdown</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableCellMeal, styles.tableHeaderCell]}>Meal</Text>
              <Text style={[styles.tableCell, styles.tableCellDetails, styles.tableHeaderCell]}>Details</Text>
            </View>

            {/* Table Rows */}
            {dietPlan.split("\n").map((line, index) => {
              const cleanedLine = line.replace(/\*/g, "").trim();
              if (!cleanedLine) return null;

              const rowStyle = index % 2 === 0 ? styles.tableRow : [styles.tableRow, styles.tableRowAlternate];

              if (cleanedLine.endsWith(":") && !cleanedLine.includes("Option")) {
                return (
                  <View key={index} style={rowStyle}>
                    <Text style={[styles.tableCell, styles.tableCellMeal]}>{cleanedLine.slice(0, -1)}</Text>
                    <Text style={[styles.tableCell, styles.tableCellDetails]}></Text>
                  </View>
                );
              } else {
                return (
                  <View key={index} style={rowStyle}>
                    <Text style={[styles.tableCell, styles.tableCellMeal]}></Text>
                    <Text style={[styles.tableCell, styles.tableCellDetails]}>{cleanedLine}</Text>
                  </View>
                );
              }
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>
            Copyright © {new Date().getFullYear()} Health Ai. All rights reserved.
            {"\n"}
            Youseef Ali Musad
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const DietPlan = () => {
  const { t } = useTranslation(); // Use the useTranslation hook
  const { isPremium } = usePremium();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [dietPlan, setDietPlan] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
    setCurrentDate(formattedDate);

    if (location.state && location.state.dietPlan) {
      const dietPlanEntries = Object.entries(location.state.dietPlan);
      const combinedPlan = dietPlanEntries
        .map(([_, value]) => value?.parts?.[0]?.text || "")
        .filter(Boolean)
        .join("\n");
      setDietPlan(combinedPlan);
    } else {
      console.error("Diet plan not found in location state");
    }
  }, [location]);

  const handleGoBack = () => {
    navigate("/services");
  };

  const goToChatPage = () => {
    navigate("/ChatPage", { state: { formData: location.state?.formData } });
  };

  // Check if the diet plan contains Arabic characters
  const isArabic = /[\u0600-\u06FF]/.test(dietPlan);

  return (
    <div className="diet-plan-page">
      <div className="diet-plan-card" style={{ marginTop: "100px" }}>
        <button className="back-button" onClick={handleGoBack}>
          <MdArrowBack />
        </button>

        <div className="header">
          <Text style={styles.title}>{t("yourPersonalizedDietPlan")}</Text>
          <p className="current-date">{currentDate}</p>
        </div>
        <div className="diet-plan-content">
          {dietPlan ? (
            dietPlan.split("\n").map((line, index) =>
              line.trim() ? (
                <p
                  key={index}
                  className={`diet-plan-line ${
                    line.startsWith("**") ? "highlight" : ""
                  }`}
                >
                  {line.replace(/\*\*/g, "")}
                </p>
              ) : null
            )
          ) : (
            <p className="loading-message">{t("loadingDietPlan")}</p>
          )}
        </div>

        {/* Conditionally render the download button */}
        {!isArabic && dietPlan && (
          isPremium ? (
            <PDFDownloadLink
              document={<DietPlanPDF dietPlan={dietPlan} currentDate={currentDate} />}
              fileName="DietPlan.pdf"
            >
              {({ loading }) => (
                <button className="download-button">
                  {loading ? t("loadingDocument") : t("downloadPDF")}
                </button>
              )}
            </PDFDownloadLink>
          ) : (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="download-button disabled"
            >
              {t("downloadPDFPremiumFeature")}
            </button>
          )
        )}
      </div>

      <button
        className="floating-chat-button"
        style={{ zIndex: "100" }}
        onClick={() => (isPremium ? goToChatPage() : goToChatPage())}
      >
        <MdChat size={24} />
        {/* {!isPremium && <span className="premium-badge">Premium</span>} */}
      </button>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="upgrade-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '450px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: '#2C3E50',
              marginBottom: '1rem',
            }}>
              {t("upgradeToPremium")}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#7F8C8D',
              marginBottom: '1.5rem',
            }}>
              {t("upgradeToPremiumDescription")}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/subscription')}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#2C3E50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1A252F')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2C3E50')}
              >
                {t("upgradeNow")}
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#e0e0e0',
                  color: '#2C3E50',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#d0d0d0')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlan;