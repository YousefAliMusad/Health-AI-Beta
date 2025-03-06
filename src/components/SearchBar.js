import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the search query to the parent component
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto" style={{marginBottom:"50px"}}>
      <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Find your perfect recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 text-gray-700 focus:outline-none"
        />
        {/* Search Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-4 hover:bg-blue-600 transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;