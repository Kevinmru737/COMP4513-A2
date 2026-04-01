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
// inside your JSX, before <Header />

function App() {
  return (
    <div>
      <AboutContextProvider>
        <LoginContextProvider>
          <Header />
          {/*FilterCP has a dependency on DataCP */}
          <DataContextProvider>
            <FilterContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginFormView />} />
                <Route path="/songs" element={<BrowseView />} />
                <Route path="/genres" element={<GenreView />} />
                <Route path="/artists" element={<ArtistView />} />
                <Route path="/playlist" element={<PlaylistView />} />
              </Routes>
            </FilterContextProvider>
          </DataContextProvider>
          <Footer />
        </LoginContextProvider>
        <AboutView />
      </AboutContextProvider>
    </div>
  );
}

export default App;
