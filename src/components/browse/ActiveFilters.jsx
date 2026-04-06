import { FilterContext } from "../contexts/FilterContext";
import { useContext } from "react";
const ActiveFilters = (props) => {
  const { filters, removeFilter, handleTitleChange, clearAllFilters } =
    useContext(FilterContext);
  const hasActiveFilters =
    filters.titleSearch ||
    filters.years.length > 0 ||
    filters.genres.length > 0 ||
    filters.artists.length > 0;

  if (!hasActiveFilters) {
    return (
      <div className="mb-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-white font-bold mb-3">Active Filters:</h3>
        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-800 text-white px-3 py-1 rounded-full flex items-center gap-2">
            <span>None</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center sticky top-30 mb-6 p-4 bg-gray-700 rounded-lg">
      <div>
        <h3 className="text-white font-bold mb-3">Active Filters:</h3>

        <div className="flex flex-wrap gap-2">
          {filters.titleSearch && (
            <div
              className="bg-gray-600 border-2 text-white px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => handleTitleChange({ target: { value: "" } })}
            >
              <span>Title: "{filters.titleSearch}"</span> ✕
            </div>
          )}
          {filters.years.map((year) => (
            <div
              key={year}
              className="bg-gray-600 border-2 text-white px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => removeFilter("years", year)}
            >
              <span>{year}</span> ✕
            </div>
          ))}
          {filters.genres.map((genre) => (
            <div
              key={genre}
              className="bg-gray-600 border-2 text-white px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => removeFilter("genres", genre)}
            >
              <span>{genre}</span> ✕
            </div>
          ))}
          {filters.artists.map((artist) => (
            <div
              key={artist}
              className="bg-gray-600 border-2 text-white px-3 py-1 rounded-full flex items-center gap-2 hover:bg-gray-400 cursor-pointer"
              onClick={() => removeFilter("artists", artist)}
            >
              <span>{artist}</span> ✕
            </div>
          ))}
        </div>
      </div>
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-40 mr-4 bg-gray-800 hover:bg-gray-600 text-white font-semibold p-4 rounded transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
