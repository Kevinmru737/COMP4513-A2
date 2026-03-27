import loginBg from "../../../assets/dj-techno-bg.jfif";
const LoggedInHome = (props) => {
  return (
    <div className="min-h-screen bg-black h-screen bg-cover bg-center flex items-center justify-center px-4 relative">
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 bg-cover bg-opacity-40"
        style={{
          backgroundImage: `url(${loginBg})`,
        }}
      ></div>

      {/* Text overlay */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
          Logged in to explore new and old passions
        </h1>
      </div>
    </div>
  );
};

export default LoggedInHome;
