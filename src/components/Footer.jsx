const Footer = (props) => {
  return (
    <footer className="bg-black py-8">
      <h1 className="text-4xl font-bold text-gray-300 mb-8 drop-shadow-lg text-center">
        Mein Footer
      </h1>
      <nav className="flex gap-6 justify-center">
        <a
          href="/"
          className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/about"
          className="text-white hover:text-yellow-300 font-semibold transition-colors duration-300"
        >
          About
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
