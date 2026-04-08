import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { FilterContext } from "../../contexts/FilterContext";
import AmbientBackground from "../../AmbientBackground";
import SongCard from "../../browse/SongCard";

const GENRE_COLORS = [
  "from-blue-500 to-blue-900",
  "from-purple-500 to-purple-900",
  "from-pink-500 to-pink-900",
  "from-red-500 to-red-900",
  "from-orange-500 to-orange-900",
  "from-yellow-500 to-yellow-900",
  "from-green-500 to-green-900",
  "from-teal-500 to-teal-900",
  "from-cyan-500 to-cyan-900",
  "from-indigo-500 to-indigo-900",
  "from-violet-500 to-violet-900",
  "from-fuchsia-500 to-fuchsia-900",
  "from-rose-500 to-rose-900",
  "from-lime-500 to-lime-900",
  "from-emerald-500 to-emerald-900",
  "from-sky-500 to-sky-900",
  "from-amber-500 to-amber-900",
  "from-slate-500 to-slate-900",
  "from-zinc-500 to-zinc-900",
  "from-stone-500 to-stone-900",
];

const SingleGenreView = () => {
  const { setFilter } = useContext(FilterContext);
  const { genreId } = useParams();
  const { genreData } = useContext(DataContext);

  const genre = genreData?.find((g) => g.genre_id === Number(genreId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (genre?.genre_name) {
      setFilter("genres", genre.genre_name);
    }
  }, [genre]);

  if (!genre) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">
        Genre not found.
      </div>
    );
  }

  const colorClass = GENRE_COLORS[genre.genre_id % GENRE_COLORS.length];

  return (
    <div className="min-h-screen bg-black py-8">
      <AmbientBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl min-h-65">
          {/* Top — genre info */}
          <div className="flex flex-col sm:flex-row gap-8 p-8 border-b border-gray-700">
            {/* Genre swatch */}
            <div className="shrink-0 flex justify-center sm:justify-start">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden w-48 border-2 border-gray-700">
                  <div className={`bg-radial ${colorClass} h-36 w-full`} />
                  <div className="bg-gray-700 px-3 py-2">
                    <p className="text-white text-sm font-semibold capitalize">
                      {genre.genre_name}
                    </p>
                  </div>
                </div>
                <div
                  className="absolute -inset-1 rounded-2xl pointer-events-none"
                  style={{ border: "1.5px solid rgba(251,146,60,0.4)" }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-3 min-w-0">
              <div>
                <p className="text-orange-400 text-xs font-normal tracking-widest uppercase mb-1">
                  Genre
                </p>
                <h1
                  className="text-gray-50 leading-none capitalize"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(36px, 5vw, 64px)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {genre.genre_name}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-xs tracking-widest uppercase">
                  Genre ID
                </span>
                <span className="text-gray-400 text-xs font-mono bg-gray-900 px-2 py-0.5 rounded">
                  #{genre.genre_id}
                </span>
              </div>
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

export default SingleGenreView;
