import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import AmbientBackground from "../../AmbientBackground";

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

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function RelatedSongCard({ song }) {
  const colorClass =
    GENRE_COLORS[song.genre?.genre_id % GENRE_COLORS.length] ??
    "from-gray-500 to-gray-900";
  return (
    <Link
      to={`/songs/${song.song_id}`}
      className="flex-shrink-0 w-40 rounded-xl overflow-hidden bg-gray-800 hover:scale-105 transition-transform duration-200 shadow-lg"
    >
      <div className={`bg-radial ${colorClass} h-20 w-full`} />
      <div className="px-3 py-2">
        <p className="text-white text-xs font-semibold truncate">
          {song.title}
        </p>
        <p className="text-gray-400 text-xs truncate">
          {song.artist?.artist_name}
        </p>
      </div>
    </Link>
  );
}

const SingleSongView = () => {
  const { songId } = useParams();
  const { songData, artistData } = useContext(DataContext);

  const song = songData?.find((s) => s.song_id === Number(songId));

  if (!song) {
    return (
      <div className="flex items-center justify-center min-h-96 text-gray-400">
        Song not found.
      </div>
    );
  }

  const artist = artistData?.find(
    (a) => a.artist_id === song.artist?.artist_id,
  );

  const genreColorClass =
    GENRE_COLORS[song.genre?.genre_id % GENRE_COLORS.length] ??
    "from-gray-500 to-gray-900";

  const radarData = [
    { metric: "Energy", value: song.energy },
    { metric: "Dance", value: song.danceability },
    { metric: "Valence", value: song.valence },
    { metric: "Acoustics", value: song.acousticness },
    { metric: "Speech", value: song.speechiness },
    { metric: "Liveness", value: song.liveness },
  ];

  // Related: closest songs by valence, danceability, and energy
  const related =
    songData
      .filter((s) => s.song_id !== song.song_id)
      .map((s) => ({
        ...s,
        _score:
          Math.abs(s.valence - song.valence) +
          Math.abs(s.danceability - song.danceability) +
          Math.abs(s.energy - song.energy),
      }))
      .sort((a, b) => a._score - b._score)
      .slice(0, 6) ?? [];

  return (
    <div className="min-h-screen bg-black py-8">
      <AmbientBackground></AmbientBackground>
      <div
        className="max-w-6xl mx-auto px-4 sm:px-8 py-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Main card */}
        <div className="bg-gray-800 relative z-10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top section */}
          <div className="flex flex-col md:flex-row">
            {/* Top-left: title + artist + meta + genre + playlist */}
            <div className="flex-1 p-8 flex flex-col gap-6">
              {/* Title block */}
              <div>
                <h1
                  className="text-gray-50 leading-none mb-3"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(36px, 5vw, 64px)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {song.title}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    to={`/artists/${song.artist?.artist_id}`}
                    className="text-gray-200 font-medium text-lg hover:text-orange-400 transition-colors"
                  >
                    {song.artist?.artist_name}
                  </Link>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-sm">{song.year}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-sm">
                    {formatDuration(song.duration)}
                  </span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-sm">{song.bpm} BPM</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-700" />

              {/* Bottom 2/3: genre + playlist */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">
                    Genre
                  </p>
                  <Link
                    to="/genres"
                    className="inline-block rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 shadow-md"
                  >
                    <div className={`bg-radial ${genreColorClass} h-12 w-36`} />
                    <div className="bg-gray-700 px-3 py-1.5">
                      <p className="text-white text-xs font-semibold capitalize">
                        {song.genre?.genre_name ?? "Unknown"}
                      </p>
                    </div>
                  </Link>
                </div>

                <div>
                  <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">
                    Popularity
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-48 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-400 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${song.popularity}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs">
                      {song.popularity}/100
                    </span>
                  </div>
                </div>

                <button className="mt-2 w-fit flex items-center gap-2 bg-orange-400 hover:bg-orange-300 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add to Playlist
                </button>
              </div>
            </div>

            {/* Top-right: artist image + radar chart */}
            <div className="flex flex-col items-center md:w-80 p-8 gap-6 border-t md:border-t-0 md:border-l border-gray-700">
              {/* Artist image */}
              {artist?.artist_image_url && (
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <img
                      src={artist.artist_image_url}
                      alt={artist.artist_name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                    />
                    <div
                      className="absolute -inset-1 rounded-full pointer-events-none"
                      style={{ border: "1.5px solid rgba(251,146,60,0.4)" }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs">
                    {artist.artist_name}
                  </span>
                </div>
              )}

              {/* Radar chart */}
              <div className="w-full">
                <p className="text-gray-500 text-xs tracking-widest uppercase mb-2 text-center">
                  Audio Profile
                </p>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis
                      dataKey="metric"
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                    />
                    <Radar
                      dataKey="value"
                      stroke="#fb923c"
                      fill="#fb923c"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Related songs row */}
          {related.length > 0 && (
            <div className="border-t border-gray-700 px-8 py-6">
              <p className="text-gray-500 text-xs tracking-widest uppercase mb-4">
                Related Songs
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {related.map((s) => (
                  <RelatedSongCard key={s.song_id} song={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSongView;
