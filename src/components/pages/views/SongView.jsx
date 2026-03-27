import { useEffect } from "react";
const SongView = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white px-16 py-12">
      Song - To be completed...
    </div>
  );
};

export default SongView;
