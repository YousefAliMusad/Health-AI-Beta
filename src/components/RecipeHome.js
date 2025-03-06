import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import recipes from "../data/baking.json";
import { useTranslation } from "react-i18next";

const RecipeHome = () => {
  const [loadedRecipes, setLoadedRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [calorieLimit, setCalorieLimit] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const { t } = useTranslation(); // Use the useTranslation hook

  // Load initial recipes
  useEffect(() => {
    setLoadedRecipes(filteredRecipes.slice(0, visibleCount));
  }, [filteredRecipes, visibleCount]);

  // Detect scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setVisibleCount((prevCount) => prevCount + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search
  const handleSearch = (query) => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(filtered, selectedCategories, calorieLimit, minRating, difficulty);
  };

  // Handle category filter
  const handleCategoryFilter = (categories) => {
    setSelectedCategories(categories);
    applyFilters(recipes, categories, calorieLimit, minRating, difficulty);
  };

  // Handle calorie limit
  const handleCalorieLimit = (limit) => {
    setCalorieLimit(limit);
    applyFilters(recipes, selectedCategories, limit, minRating, difficulty);
  };

  // Handle rating filter
  const handleRatingFilter = (rating) => {
    setMinRating(rating);
    applyFilters(recipes, selectedCategories, calorieLimit, rating, difficulty);
  };

  // Handle difficulty filter
  const handleDifficultyFilter = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    applyFilters(recipes, selectedCategories, calorieLimit, minRating, difficultyLevel);
  };

  // Apply all filters
  const applyFilters = (
    recipes,
    categories,
    calorieLimit,
    minRating,
    difficulty
  ) => {
    let filtered = recipes;

    // Filter by categories
    if (categories.length > 0) {
      filtered = filtered.filter((recipe) =>
        categories.includes(recipe.subcategory)
      );
    }

    // Filter by calorie limit
    if (calorieLimit) {
      filtered = filtered.filter(
        (recipe) => parseInt(recipe.nutrients.kcal) <= parseInt(calorieLimit)
      );
    }

    // Filter by rating
    if (minRating) {
      filtered = filtered.filter(
        (recipe) => recipe.rattings >= parseInt(minRating)
      );
    }

    // Filter by difficulty
    if (difficulty) {
      filtered = filtered.filter(
        (recipe) => recipe.difficult.toLowerCase() === difficulty.toLowerCase()
      );
    }

    setFilteredRecipes(filtered);
    setVisibleCount(12); // Reset visible count when applying filters
  };

  // Get unique categories
  const categories = [...new Set(recipes.map((recipe) => recipe.subcategory))];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[url('https://via.placeholder.com/1920x600')] bg-cover bg-center flex items-center justify-center"
      style={{marginTop:"200px"}}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-2">{t("RecipeT1")}</h1>
          <p className="text-xl text-black">{t("RecipeT2")}</p>
        </div>
      </div>

      {/* Rest of the content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Category Filter with Additional Filters */}
        <CategoryFilter
          categories={categories}
          onSelectCategory={handleCategoryFilter}
          onCalorieLimit={handleCalorieLimit}
          onRatingFilter={handleRatingFilter}
          onDifficultyFilter={handleDifficultyFilter}
        />

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Loading Indicator */}
        {loadedRecipes.length < filteredRecipes.length && (
          <div className="text-center mt-8">
            <p className="text-gray-600">{t("loadingMore")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeHome;