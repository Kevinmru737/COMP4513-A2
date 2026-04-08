import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import AmbientBackground from "../../AmbientBackground";
import SongCard from "../../browse/SongCard";
import { FilterContext } from "../../contexts/FilterContext";
const SingleArtistView = () => {
  const { setFilter } = useContext(FilterContext);
  const { artistId } = useParams();
  const { artistData } = useContext(DataContext);

  const artist = artistData?.find((a) => a.artist_id === Number(artistId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (artist?.artist_name) {
      setFilter("artists", artist.artist_name);
    }
  }, [artist]);

  // Loaded but not found
  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">
        Artist not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <AmbientBackground></AmbientBackground>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl min-h-65">
          {/* Top 1/3 — artist info */}
          <div className="flex flex-col sm:flex-row gap-8 p-8 border-b border-gray-700">
            {/* Image */}
            {artist.artist_image_url && (
              <div className="shrink-0 flex justify-center sm:justify-start">
                <div className="relative">
                  <img
                    src={artist.artist_image_url}
                    alt={artist.artist_name}
                    className="w-48 object-cover h-48 rounded-2xl border-2 border-gray-700"
                  />
                  <div
                    className="w-50 h-50 absolute -inset-1 rounded-2xl pointer-events-none"
                    style={{ border: "1.5px solid rgba(251,146,60,0.4)" }}
                  />
                </div>
              </div>
            )}

            {/* Info */}
            <div className="flex flex-col justify-center gap-3 min-w-0">
              <div>
                <p className="text-orange-400 text-xs font-normal tracking-widest uppercase mb-1">
                  {artist.types?.type_name ?? "Artist"}
                </p>
                <h1
                  className="text-gray-50 leading-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(36px, 5vw, 64px)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {artist.artist_name}
                </h1>
              </div>

              {artist.spotify_desc && (
                <p className="text-gray-400 font-light text-sm leading-relaxed max-w-2xl">
                  {artist.spotify_desc}
                </p>
              )}

              {artist.spotify_url && (
                <a
                  href={artist.spotify_url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit flex items-center gap-2 bg-gray-900 hover:border-green-500 border border-gray-700 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center flex-shrink-0">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </div>
                  <span className="text-gray-200 text-xs font-medium">
                    Open on Spotify
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <SongCard />
      </div>
    </div>
  );
};

export default SingleArtistView;
