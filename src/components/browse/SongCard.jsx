import { useContext } from "react";
import { PlusCircle } from "lucide-react";
import { FilterContext } from "../contexts/FilterContext";

const SongCard = (props) => {
  //to be implemented
  const handleAddToPlaylist = () => {};
  const { filteredSongs, toggleFilter } = useContext(FilterContext);
  return (
    <div>
      {/* Songs List */}
      {filteredSongs.length > 0 ? (
        <div className="space-y-4">
          {filteredSongs.map((song) => (
            <div
              key={song.song_id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors flex items-center justify-between gap-4"
            >
              {/* Title + Artist stacked */}
              <div className="flex flex-col min-w-0 w-1/4">
                <h3 className="text-white font-bold text-lg truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  <span className="text-gray-200 italic">
                    {song.artist?.artist_name}
                  </span>
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-600 shrink-0" />

              {/* Genre + Year */}
              <div className="flex gap-3 items-center">
                <span
                  className="bg-gray-600 rounded-full px-3 py-1 text-gray-200 text-sm hover:bg-gray-400 cursor-pointer"
                  onClick={() => toggleFilter("genres", song.genre?.genre_name)}
                >
                  {song.genre?.genre_name}
                </span>
                <span
                  className="bg-gray-600 rounded-full px-3 py-1 text-gray-200 text-sm hover:bg-gray-400 cursor-pointer"
                  onClick={() => toggleFilter("years", song.year)}
                >
                  {song.year}
                </span>
              </div>
              <button
                onClick={() => handleAddToPlaylist(song)}
                className="shrink-0 ml-auto text-gray-400 hover:text-white transition-colors"
                aria-label="Add to playlist"
              >
                <PlusCircle size={30} />
              </button>

              {/* Duration */}
              <p className="text-gray-400 text-sm shrink-0 ">
                {Math.floor(song.duration / 60)}:
                {String(song.duration % 60).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl mb-4">
            No songs match your filters
          </p>
        </div>
      )}
    </div>
  );
};

export default SongCard;
