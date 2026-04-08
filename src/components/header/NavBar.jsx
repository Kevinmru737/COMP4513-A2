import { Link } from "react-router-dom";
import PlaylistLink from "./PlaylistLink.jsx";
import { LoginContext } from "../contexts/LoginContextProvider.jsx";
import { useContext } from "react";
import { AboutContext } from "../contexts/AboutContext.jsx";

const NavBar = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const { setAboutOpen } = useContext(AboutContext);

  return (
    <nav className="flex gap-18 sm:flex-row items-center flex-1 justify-center">
      <Link
        to="/"
        className="text-white hover:text-orange-300 font-semibold transition-colors duration-300"
      >
        Home
      </Link>
      <Link
        to="/artists"
        className="text-white hover:text-orange-300 font-semibold transition-colors duration-300"
      >
        Artists
      </Link>
      <Link
        to="/genres"
        className="text-white hover:text-orange-300 font-semibold transition-colors duration-300"
      >
        Genres
      </Link>
      <Link
        to="/songs"
        className="text-white hover:text-orange-300 font-semibold transition-colors duration-300"
      >
        Songs
      </Link>
      <div
        className="text-white hover:text-orange-300 cursor-pointer font-semibold transition-colors duration-300"
        onClick={() => setAboutOpen(true)}
      >
        About
      </div>

      {/* Show when logged in */}
      {loggedIn && <PlaylistLink />}
    </nav>
  );
};

export default NavBar;
