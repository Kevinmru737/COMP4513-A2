import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
//img from https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400
import GenreImg from "../../assets/genre-banner-img.jfif";

const GenreBanner = () => {
  const { genreData } = useContext(DataContext);

  return (
    <div className="bg-gray-800 shadow-2xl max-w-6xl mx-auto rounded-2xl overflow-hidden">
      <div
        className="relative flex items-stretch min-h-65"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-1/2 right-48 -translate-y-1/2 w-80 h-80 rounded-full z-0 opacity-20 blur-2xl" />

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
            <span className="text-orange-400">Genres</span>
          </h1>

          <p className="text-gray-400 font-light text-sm max-w-xs leading-relaxed mt-1">
            Browse music by mood, style, and sound from every corner of the
            world.
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

        {/* Right — image */}
        <div className="w-lg flex items-center justify-center px-6 py-6 relative z-10">
          <img
            src={GenreImg}
            alt="Music genres"
            className="w-full h-full object-cover rounded-2xl"
            style={{ maxHeight: "240px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default GenreBanner;
