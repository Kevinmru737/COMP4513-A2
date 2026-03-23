import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PreLogHome from "./components/pages/views/PreLogHomeView.jsx";
import LoggedInHome from "./components/pages/views/LoggedInView.jsx";
import Login from "./components/pages/views/LoginFormView.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <LoggedInHome /> : <PreLogHome />}
        />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
