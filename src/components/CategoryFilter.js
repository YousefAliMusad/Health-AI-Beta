import React, { useState } from "react";
import { FaFire, FaStar, FaTachometerAlt } from "react-icons/fa"; // Icons for filters

const CategoryFilter = ({ categories, onSelectCategory, onCalorieLimit, onRatingFilter, onDifficultyFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  // Handle category selection
  const handleCategorySelect = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category) // Remove category if already selected
      : [...selectedCategories, category]; // Add category if not selected
    setSelectedCategories(updatedCategories);
    onSelectCategory(updatedCategories); // Pass selected categories to parent
  };

  // Handle calorie limit change
  const handleCalorieLimit = (e) => {
    const limit = e.target.value;
    setCalorieLimit(limit);
    onCalorieLimit(limit); // Pass calorie limit to parent
  };

  // Handle rating filter change
  const handleRatingFilter = (e) => {
    const rating = e.target.value;
    setMinRating(rating);
    onRatingFilter(rating); // Pass rating to parent
  };

  // Handle difficulty filter change
  const handleDifficultyFilter = (e) => {
    const difficultyLevel = e.target.value;
    setDifficulty(difficultyLevel);
    onDifficultyFilter(difficultyLevel); // Pass difficulty to parent
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaFire className="mr-2 text-orange-500" /> Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                selectedCategories.includes(category)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors duration-300`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Calorie Limit */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaFire className="mr-2 text-red-500" /> Calorie Limit
        </h3>
        <div className="relative">
          <input
            type="number"
            placeholder="Max calories"
            value={calorieLimit}
            onChange={handleCalorieLimit}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-4 top-2 text-gray-500">kcal</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaStar className="mr-2 text-yellow-500" /> Min Rating
        </h3>
        <select
          value={minRating}
          onChange={handleRatingFilter}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>Any</option>
          <option value={1}>1 ⭐</option>
          <option value={2}>2 ⭐</option>
          <option value={3}>3 ⭐</option>
          <option value={4}>4 ⭐</option>
          <option value={5}>5 ⭐</option>
        </select>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FaTachometerAlt className="mr-2 text-green-500" /> Difficulty
        </h3>
        <select
          value={difficulty}
          onChange={handleDifficultyFilter}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;