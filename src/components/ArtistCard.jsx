import { Link } from "react-router-dom";
import { FilterContext } from "./contexts/FilterContext";
import { useContext } from "react";

const ArtistCard = ({ artist }) => {
  const { toggleFilter, applyFilter } = useContext(FilterContext);
  return (
    <Link
      to="/songs"
      onClick={() => toggleFilter("artists", artist.artist_name)}
      className="bg-gray-800 rounded-lg shadow-xl/15 overflow-hidden will-change-transform transform-gpu hover:scale-105 duration-300"
    >
      <div className="h-48 overflow-hidden bg-gray-700">
        <img
          src={artist.artist_image_url}
          alt={artist.artist_name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-white font-bold text-xl mb-2">
          {artist.artist_name}
        </h3>
        <p className="text-blue-400 text-sm mb-4">{artist.types?.type_name}</p>
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">
          {artist.spotify_desc}
        </p>
      </div>
    </Link>
  );
};

export default ArtistCard;
