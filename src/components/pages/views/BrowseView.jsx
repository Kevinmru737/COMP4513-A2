import { useState, useEffect, useContext } from "react";
import { Spinner } from "@heroui/react";
import { DataContext } from "../../contexts/DataContext";
import supabase from "../../../supabase.js";
import ArtistBanner from "../../banners/ArtistBanner.jsx";
import SongCard from "../../browse/SongCard.jsx";
import FilterSidebar from "../../browse/FilterSidebar.jsx";
import ActiveFilters from "../../browse/ActiveFilters.jsx";
import AmbientBackground from "../../AmbientBackground.jsx";
import { FilterContext } from "../../contexts/FilterContext.jsx";

const BrowseView = () => {
  const { songData, setSongData, setGenreData, setArtistData } =
    useContext(DataContext);

  const {
    filteredSongs,
    filters,
    setFilters,
    clearAllFilters,
    applyFilters,
    setAvailableYears,
    setAvailableArtists,
    setAvailableGenres,
  } = useContext(FilterContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("3. BrowseView mounted, filters:", filters);
    fetchData();
    // Clean up the filters when the user clicks away
    //return () => clearAllFilters();
  }, []);

  useEffect(() => {
    return () => clearAllFilters();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (songData.length === 0) {
        const [songsRes, genresRes, artistsRes] = await Promise.all([
          supabase
            .from("songs")
            .select("*, artist:artists(*), genre:genres(*)"),
          supabase.from("genres").select("*"),
          supabase.from("artists").select("*"),
        ]);

        if (songsRes.error) throw new Error(songsRes.error.message);
        if (genresRes.error) throw new Error(genresRes.error.message);
        if (artistsRes.error) throw new Error(artistsRes.error.message);

        setSongData(songsRes.data);
        setGenreData(genresRes.data);
        setArtistData(artistsRes.data);

        // filter(Boolean handles null/nan values)
        setAvailableYears(
          [...new Set(songsRes.data.map((s) => s.year).filter(Boolean))].sort(
            (a, b) => a - b,
          ),
        );
        setAvailableGenres(
          [
            ...new Set(
              songsRes.data.map((s) => s.genre?.genre_name).filter(Boolean),
            ),
          ].sort(),
        );
        setAvailableArtists(
          [
            ...new Set(
              songsRes.data.map((s) => s.artist?.artist_name).filter(Boolean),
            ),
          ].sort(),
        );
        console.log("4. about to applyFilters, filters:", filters);
        applyFilters(songsRes.data, filters);
      } else {
        setAvailableYears(
          [...new Set(songData.map((s) => s.year).filter(Boolean))].sort(
            (a, b) => a - b,
          ),
        );
        setAvailableGenres(
          [
            ...new Set(
              songData.map((s) => s.genre?.genre_name).filter(Boolean),
            ),
          ].sort(),
        );
        setAvailableArtists(
          [
            ...new Set(
              songData.map((s) => s.artist?.artist_name).filter(Boolean),
            ),
          ].sort(),
        );
        console.log("4. about to applyFilters, filters:", filters);
        applyFilters(songData, filters);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      // was having an issue with ActiveFilters not populating correctly, tells it to re-render
      setFilters(filters);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      {/* Main Content */}
      <AmbientBackground />
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        <ArtistBanner />

        {/* Spinner/Loader */}
        <div className="max-w-6xl mx-auto py-8">
          {loading && (
            <div className="flex items-center gap-4 justify-center py-12 text-gray-500">
              <Spinner className="scale-300" size="xl" color="current" />
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-400 text-xl">Error: {error}</p>
            </div>
          )}

          {/* Filtering Components */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <FilterSidebar />
              </div>

              <div className="lg:col-span-3">
                <ActiveFilters />
                <div className="ml-4 mb-6">
                  <p className="text-gray-300 text-lg">
                    Found{" "}
                    <span className="text-blue-400 font-bold">
                      {filteredSongs.length}
                    </span>{" "}
                    song{filteredSongs.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <SongCard />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseView;
