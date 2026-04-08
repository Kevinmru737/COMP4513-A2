import { CircleMinus } from "lucide-react";
import { Link } from "react-router-dom";
import { PlaylistContext } from "./contexts/PlaylistContext";
import { useContext } from "react";

// shows a playlists songs based on the songs passed to it
const PlaylistSongCard = ({ songs }) => {
  const { selectedPlaylist, removeSongFromPlaylist } =
    useContext(PlaylistContext);
  return (
    <div>
      {/* Songs List */}
      {songs?.length > 0 ? (
        <div className="space-y-4">
          {songs.map((song) => (
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
              <span className="text-gray-400 text-sm shrink-0 cursor-pointer hover:text-white transition-colors">
                {song.year}
              </span>

              {/* Divider */}
              <div className="w-px h-10 bg-gray-600 shrink-0" />

              {/* Genre — right of divider */}
              <span className="text-gray-300 text-sm shrink-0 cursor-pointer hover:underline transition-colors">
                <Link
                  to={`/genres/${song.genre.genre_id}`}
                  className="hover:underline mb-2"
                >
                  {song.genre?.genre_name}
                </Link>
              </span>
              <button
                onClick={() =>
                  removeSongFromPlaylist(selectedPlaylist?.id, song.song_id)
                }
                className="shrink-0 ml-auto text-gray-400 hover:text-white transition-colors"
                aria-label="Add to playlist"
              >
                <CircleMinus size={30} />
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
            Problem fetching playlist songs.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaylistSongCard;
