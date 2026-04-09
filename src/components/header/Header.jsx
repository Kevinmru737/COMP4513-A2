import { Link } from "react-router-dom";
import ourSongsLogo from "../../assets/OurSongs Logo ChatGPT.png";
import LoginLink from "./LoginLink.jsx";
import NavBar from "./NavBar.jsx";
import PlaylistCounter from "./PlaylistCounter.jsx";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider.jsx";

const Header = (props) => {
  const [loggedIn] = useContext(LoginContext);

  return (
    <header className="sticky top-0 z-50 bg-black border-b-4 py-4">
      <div className="relative flex items-center sm:px-8 md:px-16">
        {/* Logo on the left */}
        <Link
          to="/"
          className="text-4xl font-bold text-gray-300 hover:text-yellow-300 transition-colors duration-300"
        >
          <img src={ourSongsLogo} alt="Logo" className="w-40 rounded-4xl" />
        </Link>

        {/* NavBar centered */}
        <div className="absolute lg:left-1/2 transform -translate-x-1/2">
          <NavBar />
        </div>

        {/* Right side: Playlist counter + Login */}
        <div className="ml-auto flex items-center gap-4">
          {loggedIn && <PlaylistCounter />}
          <LoginLink />
        </div>
      </div>
    </header>
  );
};

export default Header;
