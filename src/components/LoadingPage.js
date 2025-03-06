import React from 'react';
import '../LoadingPage.css'; // Ensure custom CSS is linked

const LoadingPage = () => {
  return (
    <div className="loading-container flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600">
      <div className="spinner-wrapper flex flex-col justify-center items-center space-y-5">
        <div className="spinner"></div>
        <p className="loading-text text-white text-xl sm:text-2xl md:text-3xl font-semibold opacity-90">
          Getting everything ready... Please wait.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
