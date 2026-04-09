import { useEffect, useContext } from "react";
import { AboutContext } from "../../contexts/AboutContext";
const AboutView = (props) => {
  const { aboutOpen, setAboutOpen } = useContext(AboutContext);

  useEffect(() => {
    if (aboutOpen) {
      // This padding right idea is from claude.ai (to fix the issue of window size changing from scroll bar being hidden)
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [aboutOpen]);

  if (!aboutOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">About OurSongs</h1>
          <button
            onClick={() => setAboutOpen(false)}
            className="text-gray-400 hover:text-white text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-3">Project Overview</h2>
            <p className="text-gray-300 leading-relaxed">
              OurSongs is a single-page React application designed to explore
              and discover music across different artists, genres, and songs.
              This application demonstrates full-stack development capabilities
              including frontend design, backend database management, and user
              authentication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Features</h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                • <strong>Browse Artists:</strong> Explore a collection of
                musicians and performers
              </li>
              <li>
                • <strong>Discover Genres:</strong> Filter music by genre to
                find your favorite styles
              </li>
              <li>
                • <strong>Song Library:</strong> Access detailed information
                about individual songs
              </li>
              <li>
                • <strong>Personal Playlists:</strong> Create and manage your
                custom playlists (when logged in)
              </li>
              <li>
                • <strong>User Authentication:</strong> Secure login system for
                personalized experiences
              </li>
              <li>
                • <strong>Responsive Design:</strong> Optimized for desktop and
                mobile devices
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Technology Stack</h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                • <strong>Frontend:</strong> React with Vite
              </li>
              <li>
                • <strong>Styling:</strong> Tailwind CSS
              </li>
              <li>
                • <strong>Database:</strong> Supabase
              </li>
              <li>
                • <strong>User Authentication:</strong> Supabase
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Made By</h2>
            <ul className="text-gray-300 space-y-2">
              <li>
                • <strong>Kevin Oh</strong>
              </li>
              <li>
                • <strong>Email: </strong> koh705@mtroyal.ca
              </li>
              <li>
                • <strong>GitHub: </strong>{" "}
                <a
                  className="hover:underline hover:text-blue-400"
                  href="https://github.com/Kevinmru737"
                >
                  https://github.com/Kevinmru737
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-3">Attribution</h2>
            <p className="text-gray-300 mb-3">
              This project uses external resources and libraries. All
              third-party code is properly credited and licensed according to
              their respective terms. See LICENSE for more details.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
