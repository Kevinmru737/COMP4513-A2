import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import { useContext } from "react";

const LoginLink = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  return loggedIn ? (
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
  );
};

export default LoginLink;
