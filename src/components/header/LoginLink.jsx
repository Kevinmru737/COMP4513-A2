import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import { useContext } from "react";
import supabase from "../../supabase";
const LoginLink = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    } else {
      setLoggedIn(false);
    }
  };
  return loggedIn ? (
    <Link
      to="/"
      onClick={handleLogOut}
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
