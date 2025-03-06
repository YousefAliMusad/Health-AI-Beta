import React, { useState, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import { useTranslation } from 'react-i18next';

const SkinDiseaseClassifier = () => {
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(); // Use the useTranslation hook

  // Load model on mount
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = "/model/model.json";
      const metadataURL = "/model/metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setPrediction(null); // Reset previous result
    }
  };

  // Classify image
  const classifyImage = async () => {
    if (!model || !imageUrl) return;

    setIsLoading(true);
    try {
      const img = document.getElementById('preview-image');
      const predictions = await model.predict(img);
      const topResult = predictions.sort((a, b) => b.probability - a.probability)[0];
    //   console.log(predictions)
      console.log(topResult)
      setPrediction(topResult);
    } catch (error) {
      console.error("Error classifying:", error);
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6" style={{marginTop:"100px"}}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{t("SkinDiseaseClassifier")}</h1>
          <p className="text-sm text-gray-600 mt-2">
            {t("SkinDescription")}
          </p>
        </div>

        <div className="mt-8">
          <label
            htmlFor="file-upload"
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
          >
            {imageUrl ? "Change Image" : "Upload Image"}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {imageUrl && (
          <div className="mt-8 text-center">
            <img
              id="preview-image"
              src={imageUrl}
              alt="Preview"
              className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
            />
            <button
              onClick={classifyImage}
              disabled={isLoading}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                'Classify'
              )}
            </button>
          </div>
        )}

        {prediction && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800">Diagnosis - تشخيص</h2>
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-gray-700">
                <strong>{prediction.className}</strong> <br />
                Confidence: {(prediction.probability * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinDiseaseClassifier;