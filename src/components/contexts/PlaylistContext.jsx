import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabase";
import { DataContext } from "./DataContext";

export const PlaylistContext = createContext();

export const usePlaylists = () => useContext(PlaylistContext);

export const PlaylistProvider = (props) => {
  const { songData } = useContext(DataContext);
  const [playlists, setPlaylists] = useState([]);
  const [playlistNames, setPlaylistNames] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch playlists and names ───────────────────────────────
  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // Fetch playlist song connections
      const { data: playlistData, error: playlistError } = await supabase
        .from("playlists")
        .select("*, playlist:playlist_name(*)")
        .eq("user_id", userId);
      if (playlistError) throw new Error(playlistError.message);
      setPlaylists(playlistData);

      // Fetch playlist names
      const { data: nameData, error: nameError } = await supabase
        .from("playlist_name")
        .select("*")
        .eq("user_id", userId);
      if (nameError) throw new Error(nameError.message);
      setPlaylistNames(nameData);
    } catch (e) {
      console.error(e);
      setError("Failed to load playlists.");
    } finally {
      setLoading(false);
    }
  };

  // ── Select playlist and update songs ───────────────────────
  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    if (!playlist || !songData) return;
    const songIds = playlists
      .filter((p) => p.playlist_id === playlist.id)
      .map((p) => p.song_id);
    setSelectedSongs(songData.filter((s) => songIds.includes(s.song_id)));
  };

  // ── Create a new playlist ────────────────────────────────
  const createPlaylist = async (name) => {
    if (!name.trim()) return;
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const { data: newPlaylist, error: nameError } = await supabase
        .from("playlist_name")
        .insert({ name: name.trim(), user_id: userId })
        .select()
        .single();
      if (nameError) throw new Error(nameError.message);

      setPlaylistNames((prev) => [...prev, newPlaylist]);
      return newPlaylist;
    } catch (e) {
      console.error(e);
      setError("Failed to create playlist.");
    }
  };

  // ── Delete a playlist ───────────────────────────────────
  const deletePlaylist = async (id) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // Delete songs in playlist
      const { error: songsError } = await supabase
        .from("playlists")
        .delete()
        .eq("playlist_id", id)
        .eq("user_id", userId);
      if (songsError) throw new Error(songsError.message);

      // Delete playlist name
      const { error: nameError } = await supabase
        .from("playlist_name")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      if (nameError) throw new Error(nameError.message);

      // Update local state
      setPlaylists((prev) => prev.filter((p) => p.playlist_id !== id));
      setPlaylistNames((prev) => prev.filter((p) => p.id !== id));
      if (selectedPlaylist?.id === id) {
        setSelectedPlaylist(null);
        setSelectedSongs([]);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to delete playlist.");
    }
  };

  // ── Remove a song from the selected playlist ─────────────
  const removeSongFromPlaylist = async (songId) => {
    if (!selectedPlaylist) return;
    try {
      await supabase
        .from("playlists")
        .delete()
        .eq("playlist_id", selectedPlaylist.id)
        .eq("song_id", songId);

      const updated = {
        ...selectedPlaylist,
        songs:
          selectedPlaylist.songs?.filter((s) => s.song_id !== songId) || [],
      };
      setSelectedPlaylist(updated);
      setPlaylists((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
      setSelectedSongs((prev) => prev.filter((s) => s.id !== songId));
    } catch (e) {
      console.error(e);
      setError("Failed to remove song.");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        playlistNames,
        selectedPlaylist,
        selectedSongs,
        loading,
        error,
        setError,
        selectPlaylist,
        createPlaylist,
        deletePlaylist,
        removeSongFromPlaylist,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};
