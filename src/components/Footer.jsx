import { Link } from "react-router-dom";
import { AboutContext } from "./contexts/AboutContext.jsx";
import { useContext } from "react";
const Footer = (props) => {
  const { setAboutOpen } = useContext(AboutContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t-4 border-2 border-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-around mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="text-gray-400 hover:text-orange-300 block"
              >
                Home
              </Link>
              <button
                className="text-gray-400 hover:text-orange-300 block cursor-pointer"
                onClick={() => setAboutOpen(true)}
              >
                About
              </button>
            </nav>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <nav className="space-y-2">
              <a
                href="https://github.com/Kevinmru737"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-300 block"
              >
                GitHub
              </a>
              <a
                href="mailto:koh705@mtroyal.ca"
                className="text-gray-400 hover:text-orange-300 block"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} Mein Songs. All rights reserved.</p>
          <p className="text-sm mt-2">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
