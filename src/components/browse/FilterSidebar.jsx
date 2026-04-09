import { FilterContext } from "../contexts/FilterContext";
import { useContext } from "react";

const FilterSidebar = (props) => {
  const {
    filters,
    handleTitleChange,
    toggleFilter,
    availableYears,
    availableArtists,
    availableGenres,
  } = useContext(FilterContext);

  return (
    <div className="bg-gray-800 rounded-lg p-6 sticky top-30 max-h-[calc(100vh-7.5rem)] overflow-y-auto">
      {" "}
      <h2 className="text-2xl font-bold text-white mb-6">Filters</h2>
      {/* Title Search */}
      <div className="mb-8">
        <label className="block text-white font-bold mb-3">
          Search by Title
        </label>
        <input
          type="text"
          value={filters.titleSearch}
          onChange={handleTitleChange}
          placeholder="Enter song title..."
          className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
        />
      </div>
      {/* Years */}
      <div className="mb-8">
        <label className="block text-white font-bold mb-3">Years</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {availableYears.map((year) => (
            <div key={year}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.years.includes(year)}
                  onChange={() => toggleFilter("years", year)}
                  className="mr-2 w-4 h-4"
                />
                <span
                  className={
                    filters.years.includes(year)
                      ? "text-blue-400 font-bold"
                      : "text-gray-300"
                  }
                >
                  {year}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Genres */}
      <div className="mb-8">
        <label className="block text-white font-bold mb-3">Genres</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {availableGenres.map((genre) => (
            <div key={genre}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genres.includes(genre)}
                  onChange={() => toggleFilter("genres", genre)}
                  className="mr-2 w-4 h-4"
                />
                <span
                  className={
                    filters.genres.includes(genre)
                      ? "text-blue-400 font-bold"
                      : "text-gray-300"
                  }
                >
                  {genre}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Artists */}
      <div>
        <label className="block text-white font-bold mb-3">Artists</label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {availableArtists.map((artist) => (
            <div key={artist}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.artists.includes(artist)}
                  onChange={() => toggleFilter("artists", artist)}
                  className="mr-2 w-4 h-4"
                />
                <span
                  className={
                    filters.artists.includes(artist)
                      ? "text-blue-400 font-bold"
                      : "text-gray-300"
                  }
                >
                  {artist}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
