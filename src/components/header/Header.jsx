import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import LoginLink from "./LoginLink.jsx";
import NavBar from "./NavBar.jsx";

const Header = (props) => {
  return (
    <header className="sticky top-0 z-50 bg-black border-b-4 py-10 ">
      <div className="flex flex-wrap justify-between items-center sm:px-8 md:px-16 ">
        <Link
          to="/"
          className="text-4xl font-bold text-gray-300 hover:text-yellow-300 transition-colors duration-300"
        >
          <img src={reactLogo} />
        </Link>
        <NavBar />
        <LoginLink />
      </div>
    </header>
  );
};

export default Header;
