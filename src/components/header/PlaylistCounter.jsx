import { PlaylistContext } from "../contexts/PlaylistContext.jsx";
import { useContext } from "react";
const PlaylistCounter = (props) => {
  const { selectedPlaylist, setSelectedPlaylist, getSongCount } =
    useContext(PlaylistContext);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="w-40 text-gray-300 italic flex items-center  justify-center font-bold truncate">
          Current Playlist:
        </span>
        <div className="flex"></div>

        <span className="w-30 text-orange-300 font-semibold truncate">
          {selectedPlaylist?.name ? selectedPlaylist.name : "None"}
        </span>
      </div>
      <div className=" text-orange-400 rounded-full flex items-center justify-center text-basic font-bold>">
        {selectedPlaylist?.name ? getSongCount(selectedPlaylist.id) : ""}
      </div>
    </div>
  );
};

export default PlaylistCounter;
