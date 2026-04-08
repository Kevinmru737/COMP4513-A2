import { useState, createContext, useContext } from "react";
import { DataContext } from "./DataContext";
export const FilterContext = createContext();
const FilterContextProvider = (props) => {
  const {
    songData,
    setSongData,
    genreData,
    setGenreData,
    artistData,
    setArtistData,
  } = useContext(DataContext);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [availableArtists, setAvailableArtists] = useState([]);

  const [filters, setFilters] = useState({
    titleSearch: "",
    years: [],
    genres: [],
    artists: [],
  });

  const applyFilters = (songsToFilter, currentFilters) => {
    let result = songsToFilter;

    if (currentFilters.titleSearch.trim()) {
      result = result.filter((s) =>
        s.title
          .toLowerCase()
          .includes(currentFilters.titleSearch.toLowerCase()),
      );
    }
    if (currentFilters.years.length > 0) {
      result = result.filter((s) => currentFilters.years.includes(s.year));
    }
    if (currentFilters.genres.length > 0) {
      result = result.filter((s) =>
        currentFilters.genres.includes(s.genre.genre_name),
      );
    }
    if (currentFilters.artists.length > 0) {
      result = result.filter((s) =>
        currentFilters.artists.includes(s.artist.artist_name),
      );
    }
    setFilteredSongs(result);
  };
  const handleTitleChange = (e) => {
    const newFilters = { ...filters, titleSearch: e.target.value };
    setFilters(newFilters);
    applyFilters(songData, newFilters);
  };

  const toggleFilter = (type, value) => {
    const newFilters = { ...filters };
    const index = newFilters[type].indexOf(value);
    if (index > -1) newFilters[type].splice(index, 1);
    else newFilters[type].push(value);
    setFilters(newFilters);
    if (songData.length > 0) {
      applyFilters(songData, newFilters);
    }
  };

  const setFilter = (type, value) => {
    const newFilters = {
      titleSearch: "",
      years: [],
      genres: [],
      artists: [],
      [type]: [value],
    };
    setFilters(newFilters);
    if (songData.length > 0) applyFilters(songData, newFilters);
  };

  const removeFilter = (type, value) => {
    const newFilters = { ...filters };
    newFilters[type] = newFilters[type].filter((f) => f !== value);
    setFilters(newFilters);
    applyFilters(songData, newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = { titleSearch: "", years: [], genres: [], artists: [] };
    setFilters(newFilters);
    applyFilters(songData, newFilters);
  };

  return (
    <FilterContext.Provider
      value={{
        filteredSongs,
        setFilteredSongs,
        filters,
        setFilters,
        setFilter,
        clearAllFilters,
        toggleFilter,
        removeFilter,
        handleTitleChange,
        applyFilters,
        availableArtists,
        setAvailableArtists,
        availableYears,
        setAvailableYears,
        availableGenres,
        setAvailableGenres,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
