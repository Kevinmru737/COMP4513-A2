import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import { useContext } from "react";

const LoginLink = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  return loggedIn ? (
    <Link
      to="/"
      onClick={() => setLoggedIn(false)}
      className="text-white hover:text-orange-300 font-semibold transition-colors duration-300"
    >
      Log Out
    </Link>
  ) : (
    <Link
      to="/login"
      className="text-white hover:text-orange-300 font-semibold transition-colors duration-300"
    >
      Login
    </Link>
  );
};

export default LoginLink;
