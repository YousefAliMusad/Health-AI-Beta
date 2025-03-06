import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import recipes from "../data/baking.json";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === id);
  const [showNutrition, setShowNutrition] = useState(false);

  if (!recipe) {
    return <div className="text-center text-red-500">Recipe not found!</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12"
    >
      <div className="container mx-auto px-4"
      style={{marginTop:"78px"}}
      >
        {/* Recipe Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
          <p className="text-xl text-gray-700">{recipe.description}</p>
        </motion.div>

        {/* Recipe Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12 w-full h-[400px] overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Recipe Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Ingredients */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Steps</h2>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Additional Details */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Author</h3>
              <p className="text-gray-700">{recipe.author}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Ratings</h3>
              <p className="text-gray-700">{recipe.rattings} ⭐</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Difficulty</h3>
              <p className="text-gray-700">{recipe.difficult}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Serves</h3>
              <p className="text-gray-700">{recipe.serves} people</p>
            </div>
          </div>
        </motion.div>

        {/* Nutritional Information Toggle */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12"
        >
          <button
            onClick={() => setShowNutrition(!showNutrition)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg"
          >
            {showNutrition ? "Hide Nutrition" : "Show Nutrition"}
          </button>
        </motion.div>

        {/* Nutritional Information */}
        <AnimatePresence>
          {showNutrition && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutritional Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Calories</h3>
                  <p className="text-gray-700">{recipe.nutrients.kcal}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Fat</h3>
                  <p className="text-gray-700">{recipe.nutrients.fat}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Carbs</h3>
                  <p className="text-gray-700">{recipe.nutrients.carbs}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Protein</h3>
                  <p className="text-gray-700">{recipe.nutrients.protein}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;