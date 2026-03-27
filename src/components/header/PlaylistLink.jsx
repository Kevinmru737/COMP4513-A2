import { Link } from "react-router-dom";

const PlaylistLink = (props) => {
  return (
    <>
      <Link
        to="/playlist"
        className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
      >
        Playlist
      </Link>
    </>
  );
};

export default PlaylistLink;
