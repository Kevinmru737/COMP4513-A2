import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginFormView from "./components/pages/views/LoginFormView.jsx";
import AboutView from "./components/pages/views/AboutView.jsx";
import SongView from "./components/pages/views/SongView.jsx";
import GenreView from "./components/pages/views/GenreView.jsx";
import ArtistView from "./components/pages/views/ArtistView.jsx";
import PlaylistView from "./components/pages/views/PlaylistView.jsx";
import LoginContextProvider from "./components/contexts/LoginContextProvider.jsx";
import AboutContextProvider from "./components/contexts/AboutContext.jsx";
function App() {
  return (
    <div>
      <AboutContextProvider>
        <LoginContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginFormView />} />
            <Route path="/songs" element={<SongView />} />
            <Route path="/genres" element={<GenreView />} />
            <Route path="/artists" element={<ArtistView />} />
            <Route path="/playlist" element={<PlaylistView />} />
          </Routes>
          <Footer />
        </LoginContextProvider>

        <AboutView />
      </AboutContextProvider>
    </div>
  );
}

export default App;
