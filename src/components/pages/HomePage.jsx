import PreLogHome from "./views/PreLogHomeView.jsx";
import LoggedInHome from "./views/LoggedInView.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import LoginPrompt from "../LoginPrompt.jsx";
import { LoginContext } from "../contexts/LoginContextProvider.jsx";

const HomePage = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return loggedIn ? <LoggedInHome /> : <LoginPrompt />;
};

export default HomePage;
