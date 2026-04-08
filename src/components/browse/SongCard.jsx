import { useContext } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FilterContext } from "../contexts/FilterContext";
import { PlaylistContext } from "../contexts/PlaylistContext";

// shows all songs in the filtered songs list
const SongCard = (props) => {
  const { selectedPlaylist, addSongToPlaylist } = useContext(PlaylistContext);
  // may
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
                  <Link
                    to={`/songs/${song.song_id}`}
                    className="hover:underline mb-2"
                  >
                    {song.title}
                  </Link>
                </h3>
                <p className="text-gray-400 text-sm">
                  <span className="text-gray-200 italic">
                    <Link
                      to={`/artists/${song.artist.artist_id}`}
                      className="hover:underline mb-2"
                    >
                      {song.artist?.artist_name}
                    </Link>
                  </span>
                </p>
              </div>

              {/* Year — left of divider */}
              <span
                className="text-gray-400 text-sm shrink-0 cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleFilter("years", song.year)}
              >
                {song.year}
              </span>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-600 shrink-0" />

              {/* Genre — right of divider */}
              <span className="text-gray-300 text-sm shrink-0 cursor-pointer hover:underline transition-colors">
                <Link
                  to={`/genres/${(selectedPlaylist?.id, song.genre.genre_id)}`}
                  className="hover:underline mb-2"
                >
                  {song.genre?.genre_name}
                </Link>
              </span>
              <button
                onClick={() =>
                  addSongToPlaylist(selectedPlaylist?.id, song.song_id)
                }
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
