import { useState, useEffect } from "react";
import { Spinner } from "@heroui/react";
import GenreCard from "../../GenreCard";
import ArtistBanner from "../../ArtistBanner";
import supabase from "../../../supabase.js";

const GenreView = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from("genres")
        .select("*");

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setGenres(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <ArtistBanner />
      {/* Content */}
      <div className="max-w-6xl mx-auto py-8">
        {loading && (
          <div className="flex items-center gap-4 justify-center py-12">
            <Spinner className="scale-300" size="xl" color="accent" />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-400 text-xl">Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
            {genres.map((genre) => (
              <GenreCard key={genre.genre_id} genre={genre} />
            ))}
          </div>
        )}

        {!loading && !error && genres.length === 0 && (
          <p className="text-gray-400 text-xl">No Genres found</p>
        )}
      </div>
    </div>
  );
};

export default GenreView;
