import { Link } from "react-router-dom";
import PlaylistLink from "./PlaylistLink.jsx";
import { LoginContext } from "../contexts/LoginContextProvider.jsx";
import { useContext } from "react";
import { AboutContext } from "../contexts/AboutContext.jsx";

const NavBar = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { setAboutOpen } = useContext(AboutContext);

  return (
    <nav className="flex gap-18 flex-1 justify-center">
      <Link
        to="/"
        className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
      >
        Home
      </Link>
      <Link
        to="/artists"
        className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
      >
        Artists
      </Link>
      <Link
        to="/genres"
        className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
      >
        Genres
      </Link>
      <Link
        to="/songs"
        className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
      >
        Songs
      </Link>
      <button
        className="text-white hover:text-yellow-300 cursor-pointer font-semibold transition-colors duration-300"
        onClick={() => setAboutOpen(true)}
      >
        About
      </button>

      {/* Show when logged in */}
      {loggedIn && <PlaylistLink />}
      {loggedIn && (
        <div className="flex gap-6 items-center shrink-0 pl-6">
          <span className="text-white font-semibold">Playlists: 5</span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
