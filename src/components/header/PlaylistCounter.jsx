import { PlaylistContext } from "../contexts/PlaylistContext.jsx";
import { Badge } from "@heroui/react";
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
      <Badge.Anchor>
        <span className="m-2  mb-6"></span>
        {selectedPlaylist?.name && (
          <Badge variant="primary" color="warning" size="lg">
            {getSongCount(selectedPlaylist.id)}
          </Badge>
        )}
      </Badge.Anchor>
      <div className="mr-4"></div>
    </div>
  );
};

export default PlaylistCounter;
