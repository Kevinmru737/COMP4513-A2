import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginFormView from "./components/pages/views/LoginFormView.jsx";
import AboutView from "./components/pages/views/AboutView.jsx";
import BrowseView from "./components/pages/views/BrowseView.jsx";
import GenreView from "./components/pages/views/GenreView.jsx";
import ArtistView from "./components/pages/views/ArtistView.jsx";
import PlaylistView from "./components/pages/views/PlaylistView.jsx";
import LoginContextProvider from "./components/contexts/LoginContextProvider.jsx";
import AboutContextProvider from "./components/contexts/AboutContext.jsx";
import DataContextProvider from "./components/contexts/DataContext.jsx";
import FilterContextProvider from "./components/contexts/FilterContext.jsx";
import SingleSongView from "./components/pages/views/SingleSongView.jsx";
import SingleArtistView from "./components/pages/views/SingleArtistView.jsx";
import SingleGenreView from "./components/pages/views/SingleGenreView.jsx";
import PlaylistContextProvider from "./components/contexts/PlaylistContext.jsx";
import ToastContextProvider from "./components/contexts/ToastContext.jsx";
// inside your JSX, before <Header />

function App() {
  return (
    <div>
      <ToastContextProvider>
        <AboutContextProvider>
          <LoginContextProvider>
            {/*FilterCP has a dependency on DataCP */}
            <DataContextProvider>
              <PlaylistContextProvider>
                <FilterContextProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginFormView />} />
                    <Route path="/songs" element={<BrowseView />} />
                    <Route path="/songs/:songId" element={<SingleSongView />} />
                    <Route path="/genres" element={<GenreView />} />
                    <Route
                      path="/genres/:genreId"
                      element={<SingleGenreView />}
                    />
                    <Route path="/artists" element={<ArtistView />} />
                    <Route
                      path="/artists/:artistId"
                      element={<SingleArtistView />}
                    />
                    <Route path="/playlist" element={<PlaylistView />} />
                  </Routes>
                  <Footer />
                </FilterContextProvider>
              </PlaylistContextProvider>
            </DataContextProvider>
          </LoginContextProvider>
          <AboutView />
        </AboutContextProvider>
      </ToastContextProvider>
    </div>
  );
}

export default App;
