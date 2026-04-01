import { useState, createContext } from "react";
export const DataContext = createContext();
const DataContextProvider = (props) => {
  const [artistData, setArtistData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [songData, setSongData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        artistData,
        setArtistData,
        genreData,
        setGenreData,
        songData,
        setSongData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
