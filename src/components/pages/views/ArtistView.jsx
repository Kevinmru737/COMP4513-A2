import { useState, useEffect } from "react";
import { Spinner } from "@heroui/react";

import ArtistCard from "../../ArtistCard";
import ArtistBanner from "../../ArtistBanner";
import supabase from "../../../supabase.js";

const ArtistView = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const { data, error: supabaseError } = await supabase
        .from("artists")
        .select("*");

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setArtists(data);
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
          <div className="flex  items-center gap-4 justify-center py-12">
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
            {artists.map((artist) => (
              <ArtistCard key={artist.artist_id} artist={artist} />
            ))}
          </div>
        )}

        {!loading && !error && artists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No artists found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistView;
