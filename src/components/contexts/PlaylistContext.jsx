import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabase";
import { ToastContext } from "../contexts/ToastContext";

export const PlaylistContext = createContext();

const PlaylistContextProvider = (props) => {
  const { showToast } = useContext(ToastContext);

  const [playlistNames, setPlaylistNames] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState([]);

  // ── Add song to playlist ────────────────────────────────────────────────
  const addSongToPlaylist = async (playlistId, songId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) throw new Error("User not logged in");

      const exists = playlists.some(
        (p) => p.playlist_id === playlistId && p.song_id === songId,
      );

      if (exists) {
        showToast("Already in playlist");
        return;
      }
      // Insert song into the playlists table
      const { data, error } = await supabase
        .from("playlists")
        .upsert([{ playlist_id: playlistId, song_id: songId, user_id: userId }])
        .select();

      if (error) {
        showToast("Error adding to playlist...");
        throw new Error(error.message);
      }
      // Update local state
      setPlaylists((prev) => [...prev, ...data]);
      showToast("Song added to Playlist!");
    } catch (err) {
      console.error("Failed to add song to playlist:", err.message);
      throw err; // optional: rethrow so UI can catch
    }
  };

  // ── Remove song from playlist ────────────────────────────────────────────────
  const removeSongFromPlaylist = async (playlistId, songId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;
      if (!userId) throw new Error("User not logged in");

      // Delete from DB
      const { error } = await supabase
        .from("playlists")
        .delete()
        .eq("playlist_id", playlistId)
        .eq("song_id", songId)
        .eq("user_id", userId);

      if (error) {
        showToast("Error removing from playlist...");
        throw new Error(error.message);
      }

      // Update local state
      setPlaylists((prev) =>
        prev.filter(
          (p) => !(p.playlist_id === playlistId && p.song_id === songId),
        ),
      );

      showToast("Song removed from playlist!");
    } catch (err) {
      console.error("Failed to remove song from playlist:", err.message);
    }
  };

  const getSongCount = (playlist_id) => {
    const curr_playlists = playlists.filter(
      (p) => p.playlist_id === playlist_id,
    );
    return curr_playlists.length;
  };
  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        playlistNames,
        selectedPlaylist,
        setPlaylistNames,
        setPlaylists,
        setSelectedPlaylist,
        addSongToPlaylist,
        getSongCount,
        removeSongFromPlaylist,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
