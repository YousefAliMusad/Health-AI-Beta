import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as tf from "@tensorflow/tfjs";
import "react-toastify/dist/ReactToastify.css";

const ImageAnalysis = () => {
  const [preview, setPreview] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);

  // Load model with proper error handling
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel(
          "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/classification/5/default/1",
          { fromTFHub: true }
        );
        setModel(loadedModel);
      } catch (error) {
        console.error("Model loading failed:", error);
        toast.error("Failed to load AI model");
      }
    };

    loadModel();
  }, []);

  const CLASS_LABELS = [
    "Acne", "Eczema", "Rash", 
    "Psoriasis", "Normal Skin"
  ];

  const preprocessImage = (imageElement) => {
    return tf.tidy(() => {
      let tensor = tf.browser.fromPixels(imageElement)
        .resizeBilinear([224, 224])
        .toFloat();
      return tensor.div(127.5).sub(1).expandDims();
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !model) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const img = new Image();
      img.src = reader.result;
      
      img.onload = async () => {
        try {
          const tensor = preprocessImage(img);
          const predictions = await model.predict(tensor).data();
          
          const results = Array.from(predictions)
            .map((prob, index) => ({
              label: CLASS_LABELS[index] || `Condition ${index + 1}`,
              probability: (prob * 100).toFixed(2)
            }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 3);

          setPreview(reader.result);
          setResults(results);
        } catch (error) {
          toast.error("Analysis failed");
          console.error("Prediction error:", error);
        } finally {
          setLoading(false);
        }
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4" style={{ marginTop: "150px" }}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Skin Symptom Checker
        </h1>

        <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="imageInput"
          />
          <label
            htmlFor="imageInput"
            className="block p-8 text-center cursor-pointer"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 w-full object-contain rounded"
              />
            ) : (
              <p className="text-gray-500">
                {loading ? "Analyzing..." : "Click to upload photo"}
              </p>
            )}
          </label>
        </div>

        {results.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Possible Conditions:</h2>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={index} className="bg-white p-3 rounded shadow">
                  <span className="font-medium">{result.label}</span>
                  <span className="float-right text-blue-600">
                    {result.probability}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-red-500">
              Note: This is an AI prediction, not medical advice.
            </p>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ImageAnalysis;