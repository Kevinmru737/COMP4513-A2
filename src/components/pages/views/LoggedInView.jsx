import { Link } from "react-router-dom";
import loginBg from "../../../assets/dj-techno-bg.jfif";
import AmbientBackground from "../../AmbientBackground";
const LoggedInHome = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <AmbientBackground></AmbientBackground>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* Accent glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(251,146,60,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-orange-400" />
          <span className="text-orange-400 text-xs font-normal tracking-[0.25em] uppercase">
            Welcome Back
          </span>
          <div className="w-8 h-px bg-orange-400" />
        </div>

        {/* Heading */}
        <h1
          className="text-white leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px, 9vw, 110px)",
            letterSpacing: "0.03em",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          Explore New <br />
          <span className="text-orange-400">& Old</span> Harmonies
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 font-light text-lg max-w-md leading-relaxed">
          Dive into artists, genres, and songs that move you — your soundtrack
          is waiting.
        </p>

        {/* Stat row */}
        <div className="flex gap-10 mt-4 border-t border-gray-800 pt-8">
          {[
            { label: "Songs", value: "100+" },
            { label: "Artists", value: "50+" },
            { label: "Genres", value: "20+" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-orange-400"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "32px",
                  letterSpacing: "0.04em",
                }}
              >
                {value}
              </span>
              <span className="text-gray-500 text-xs tracking-widest uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoggedInHome;
