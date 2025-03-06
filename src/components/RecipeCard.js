import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
      {/* Recipe Image */}
      <img
        src={recipe.image || "https://via.placeholder.com/300"}
        alt={recipe.name}
        className="w-full h-48 object-cover"
      />

      {/* Recipe Content */}
      <div className="p-6">
        {/* Recipe Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h2>

        {/* Recipe Metadata (Time, Servings, Ratings) */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <span className="text-gray-600">🕒</span>
            <span className="ml-2 text-gray-600">{recipe.times.Preparation || "20 mins"}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">🍽️</span>
            <span className="ml-2 text-gray-600">{recipe.serves || "4-6 servings"}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">⭐</span>
            <span className="ml-2 text-gray-600">{recipe.rattings || "5"}</span>
          </div>
        </div>

        {/* Recipe Description */}
        <p className="text-gray-600 mb-4">
          {recipe.description || "There's no better way to celebrate May being National Strawberry Month than by sharing a sweet treat with your pupil! Strawberries..."}
        </p>

        {/* View Recipe Button */}
        <Link
          to={`/recipe/${recipe.id}`}
          className="inline-block bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full hover:from-red-500 hover:to-pink-500 transition-all duration-300"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;