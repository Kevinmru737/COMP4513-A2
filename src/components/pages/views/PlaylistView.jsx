import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import AmbientBackground from "../../AmbientBackground";
import supabase from "../../../supabase.js";
import { Spinner } from "@heroui/react";
import { Trash2 } from "lucide-react";
import PlaylistSongCard from "../../PlaylistSongCard.jsx";
import { PlaylistContext } from "../../contexts/PlaylistContext.jsx";
// ── Main component ────────────────────────────────────────────────────────────
const PlaylistView = () => {
  const { songData, setSongData, setGenreData, setArtistData } =
    useContext(DataContext);

  const {
    playlists,
    playlistNames,
    setPlaylists,
    setPlaylistNames,
    selectedPlaylist,
    setSelectedPlaylist,
    getSongCount,
  } = useContext(PlaylistContext);

  const [selectedSongs, setSelectedSongs] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  // ── Load playlists on mount ─────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchPlaylists();
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedPlaylist || !songData || playlists.length === 0) return;

    const songIds = playlists
      .filter((p) => p.playlist_id === selectedPlaylist.id)
      .map((p) => p.song_id);

    const newSongs = songData.filter((s) => songIds.includes(s.song_id));

    setSelectedSongs(newSongs);
  }, [selectedPlaylist, playlists, songData]);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      const { data: combData, error: supabaseError } = await supabase
        .from("playlists")
        .select("*, playlist:playlist_name(*)")
        .eq("user_id", userId);
      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      setPlaylists(combData);
      console.log(combData);

      const { data: nameData, error: nameSBError } = await supabase
        .from("playlist_name")
        .select("*")
        .eq("user_id", userId);
      if (nameSBError) {
        throw new Error(nameSBError.message);
      }

      setPlaylistNames(nameData);
    } catch (e) {
      setError("Failed to load playlists.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      if (songData.length === 0) {
        const [songsRes, genresRes, artistsRes] = await Promise.all([
          supabase
            .from("songs")
            .select("*, artist:artists(*), genre:genres(*)"),
          supabase.from("genres").select("*"),
          supabase.from("artists").select("*"),
        ]);

        if (songsRes.error) throw new Error(songsRes.error.message);
        if (genresRes.error) throw new Error(genresRes.error.message);
        if (artistsRes.error) throw new Error(artistsRes.error.message);

        setSongData(songsRes.data);
        setGenreData(genresRes.data);
        setArtistData(artistsRes.data);
      } else {
      }
    } catch (err) {
      setError(err.message);
    } finally {
      // was having an issue with ActiveFilters not populating correctly, tells it to re-render
      setLoading(false);
    }
  };

  // ── Create playlist ─────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!newPlaylistName.trim()) return;
    setCreating(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // 1. Create the playlist name entry
      const { data: newPlaylist, error: nameError } = await supabase
        .from("playlist_name")
        .insert({ name: newPlaylistName.trim(), user_id: userId })
        .select()
        .single();

      if (nameError) throw new Error(nameError.message);

      setPlaylistNames((prev) => [...prev, newPlaylist]);
      setNewPlaylistName("");
    } catch (e) {
      setError("Failed to create playlist.");
    } finally {
      setCreating(false);
    }
  };

  // ── Delete playlist ─────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      // 1. Delete all songs in this playlist
      const { error: songsError } = await supabase
        .from("playlists")
        .delete()
        .eq("playlist_id", id)
        .eq("user_id", userId);
      if (songsError) throw new Error(songsError.message);

      // 2. Delete the playlist name entry
      const { data: nameData, error: nameError } = await supabase
        .from("playlist_name")
        .delete()
        .eq("id", id)
        .eq("user_id", userId)
        .select(); // optional: returns deleted row
      if (nameError) throw new Error(nameError.message);

      // 3. Update local state
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

  // ── Remove song from playlist ───────────────────────────────────────────────
  const handleRemoveSong = async (songId) => {
    if (!selectedPlaylist) return;
    try {
      await api.removeSongFromPlaylist(selectedPlaylist.id, songId);
      const updated = {
        ...selectedPlaylist,
        songs: selectedPlaylist.songs.filter((s) => s.song_id !== songId),
      };
      setSelectedPlaylist(updated);
      setPlaylists((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
    } catch (e) {
      setError("Failed to remove song.");
    }
  };

  return (
    <div
      className="min-h-screen bg-black py-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <AmbientBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-col gap-6">
        {/* Error toast */}
        {error && (
          <div className="bg-red-900/60 border border-red-700 text-red-200 text-sm px-4 py-3 rounded-xl flex justify-between items-center">
            {error}
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-white ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Section 1: Your Playlists ─────────────────────────────────────── */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-xs font-normal tracking-widest uppercase mb-1">
                Library
              </p>
              <h2
                className="text-gray-50 leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  letterSpacing: "0.02em",
                }}
              >
                Your Playlists
              </h2>
            </div>
            <span className="text-gray-500 text-sm">
              {playlistNames.length}{" "}
              {playlistNames.length === 1 ? "playlist" : "playlists"}
            </span>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-orange-400 rounded-full animate-spin" />
              </div>
            ) : playlistNames.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No playlists yet — create one below.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {playlistNames.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlaylist(p)}
                    className={`flex items-center justify-between px-4 border-4 border-gray-900 py-3 rounded-xl cursor-pointer transition-colors shadow-2xl ${
                      selectedPlaylist?.id === p.id
                        ? "bg-gray-700 border border-orange-400/30"
                        : "hover:bg-gray-700/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-gray-100 font-medium text-sm">
                          {p.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {getSongCount(p.id)} songs
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(p.id);
                      }}
                      className="text-gray-900 hover:text-red-400 transition-colors"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Section 2: Create New Playlist ───────────────────────────────── */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <p className="text-orange-400 text-xs font-normal tracking-widest uppercase mb-1">
              New
            </p>
            <h2
              className="text-gray-50 leading-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: "0.02em",
              }}
            >
              Create Playlist
            </h2>
          </div>

          <div className="p-6 flex gap-3 items-center">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Playlist name..."
              className="flex-1 px-4 py-2.5 bg-gray-900 text-white text-sm rounded-xl border border-gray-700 focus:border-orange-400 outline-none transition-colors placeholder:text-gray-600"
            />
            <button
              onClick={handleCreate}
              disabled={creating || !newPlaylistName.trim()}
              className="flex items-center gap-2 bg-orange-400 hover:bg-orange-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              {creating ? (
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
              Create
            </button>
          </div>
        </div>

        {/* ── Section 3: Selected Playlist ─────────────────────────────────── */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex items-start justify-between">
            <div>
              <p className="text-orange-400 text-xs font-normal tracking-widest uppercase mb-1">
                Now Viewing
              </p>
              <h2
                className="text-gray-50 leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  letterSpacing: "0.02em",
                }}
              >
                {selectedPlaylist
                  ? selectedPlaylist.name
                  : "No Playlist Selected"}
              </h2>
              {selectedPlaylist && (
                <p className="text-gray-500 text-xs mt-1">
                  {getSongCount(selectedPlaylist.id)}{" "}
                  {getSongCount(selectedPlaylist.id) === 1 ? "song" : "songs"}
                </p>
              )}
            </div>
          </div>

          <div className="p-4">
            {!selectedPlaylist && (
              <p className="text-gray-500 text-sm text-center py-8">
                Select a playlist to view its songs.
              </p>
            )}
            {selectedPlaylist && getSongCount(selectedPlaylist.id) === 0 && (
              <p className="text-gray-500 text-sm text-center py-8">
                This playlist is empty — add songs from the browse view.
              </p>
            )}
          </div>
        </div>
        {loading && (
          <div className="flex items-center gap-4 justify-center py-12 text-gray-500">
            <Spinner className="scale-300" size="xl" color="current" />
          </div>
        )}
        {!loading && selectedPlaylist && selectedSongs && (
          <div className="flex flex-col gap-2">
            <PlaylistSongCard songs={selectedSongs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistView;
