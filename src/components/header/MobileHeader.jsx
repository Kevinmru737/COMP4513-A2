import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ourSongsLogo from "../../assets/OurSongs Logo ChatGPT.png";
import { LoginContext } from "../contexts/LoginContextProvider.jsx";
import { PlaylistContext } from "../contexts/PlaylistContext.jsx";
import { AboutContext } from "../contexts/AboutContext.jsx";
import supabase from "../../supabase";
import { Badge } from "@heroui/react";

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { selectedPlaylist, getSongCount, resetPlaylistContext } =
    useContext(PlaylistContext);
  const { setAboutOpen } = useContext(AboutContext);
  const menuRef = useRef(null);

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    } else {
      setLoggedIn(false);
      resetPlaylistContext();
      setMenuOpen(false);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-black border-b-4">
      <div ref={menuRef}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={ourSongsLogo} alt="Logo" className="w-28 rounded-4xl" />
          </Link>

          {/* Right side: playlist badge + hamburger */}
          <div className="flex items-center gap-3">
            {/* Compact playlist indicator when logged in */}
            {loggedIn && selectedPlaylist?.name && (
              <div className="flex items-center gap-1">
                <span className="text-orange-300 text-xs font-semibold truncate max-w-[80px]">
                  {selectedPlaylist.name}
                </span>
                <Badge.Anchor>
                  <span className="p-2"></span>
                  <Badge variant="primary" color="warning" size="sm">
                    {getSongCount(selectedPlaylist.id)}
                  </Badge>
                </Badge.Anchor>
              </div>
            )}

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Dropdown menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-4 pb-4 gap-1 bg-black border-t border-gray-800">
            {[
              { to: "/", label: "Home" },
              { to: "/artists", label: "Artists" },
              { to: "/genres", label: "Genres" },
              { to: "/songs", label: "Songs" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-orange-300 font-semibold py-2.5 border-b border-gray-800 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}

            {/* About — not a route, opens modal */}
            <button
              onClick={() => {
                setAboutOpen(true);
                setMenuOpen(false);
              }}
              className="text-left text-white hover:text-orange-300 font-semibold py-2.5 border-b border-gray-800 transition-colors duration-200 focus:outline-none"
            >
              About
            </button>

            {/* Playlist link — only when logged in */}
            {loggedIn && (
              <Link
                to="/playlist"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-yellow-300 font-semibold py-2.5 border-b border-gray-800 transition-colors duration-200"
              >
                Playlist
              </Link>
            )}

            {/* Login / Logout */}
            {loggedIn ? (
              <button
                onClick={handleLogOut}
                className="text-left text-white hover:text-orange-300 font-semibold py-2.5 transition-colors duration-200 focus:outline-none"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-orange-300 font-semibold py-2.5 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
