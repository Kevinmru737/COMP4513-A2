import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="sticky top-0 z-50 bg-black border-b-4 py-8">
      <div className="flex justify-between items-center px-16 mb-8">
        <Link
          to="/"
          className="text-4xl font-bold text-gray-300 hover:text-yellow-300 transition-colors duration-300"
        >
          Mein Songs
        </Link>
        {props.loggedIn ? (
          <Link
            to="/login"
            className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
          >
            Hi User!
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
