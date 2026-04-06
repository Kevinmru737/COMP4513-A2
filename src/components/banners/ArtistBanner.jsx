import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext"; // update path to match your project

const SpotifyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

// boilerplate given by claude.ai for styling
const ArtistBanner = () => {
  const { artistData } = useContext(DataContext);
  const [current, setCurrent] = useState(0);
  const artist = artistData[current];

  const prev = () =>
    setCurrent((c) => (c - 1 + artistData.length) % artistData.length);
  const next = () => setCurrent((c) => (c + 1) % artistData.length);

  if (!artistData?.length) return null;

  return (
    <div className="bg-gray-800 shadow-2xl max-w-6xl mx-auto rounded-2xl overflow-hidden">
      <div
        className="relative flex items-stretch min-h-65"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Left — heading */}
        <div className="flex-1 flex flex-col justify-center gap-2 px-12 py-12 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-0.5 bg-orange-400 rounded-full" />
            <span className="text-orange-400 text-xs font-normal tracking-widest uppercase">
              Featured Collection
            </span>
          </div>

          <h1
            className="text-gray-50 leading-none m-0"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(52px, 7vw, 82px)",
              letterSpacing: "0.02em",
            }}
          >
            Explore
            <br />
            <span className="text-orange-400">Artists</span>
          </h1>

          <p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed mt-1">
            Discover talented musicians and their songs from around the world.
          </p>
        </div>

        {/* Vertical divider */}
        <div
          className="shrink-0 w-px my-8 relative z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #374151 30%, #374151 70%, transparent)",
          }}
        />

        {/* Right — artist card */}
        <div className="w-96 shrink-0 flex flex-col justify-center gap-3 px-8 py-9 relative z-10">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-[16px] font-medium tracking-[0.18em] uppercase">
              Featured Artist
            </span>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="relative w-18 h-18 shrink-0">
              <img
                src={artist.artist_image_url}
                alt={artist.artist_name}
                className="rounded-full object-cover border-2 border-gray-700"
              />
              <div
                className="absolute -inset-0.75 rounded-full pointer-events-none"
                style={{ border: "1.5px solid rgba(251,146,60,0.5)" }}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-50 font-medium text-base leading-tight">
                {artist.artist_name}
              </span>
              <span className="text-gray-500 font-light text-s italic">
                {artist.types?.type_name ?? "Artist"}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-gray-500 font-light text-s leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {artist.spotify_desc}
          </p>

          {/* Spotify link */}
          <a
            href={artist.spotify_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-900 rounded-lg px-3 py-2 border border-gray-700 hover:border-green-500 transition-colors no-underline"
          >
            <div className="w-5.5 h-5.5 rounded-full bg-[#1DB954] flex items-center justify-center shrink-0">
              <SpotifyIcon />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-gray-200 text-[14px] font-medium truncate">
                {artist.artist_name}
              </div>
              <div className="text-gray-600 text-[13px] font-light">
                Open on Spotify
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtistBanner;
