import { useEffect } from "react";
const PlaylistView = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white px-16 py-12">
      Playlist - To be Completed...
    </div>
  );
};

export default PlaylistView;
