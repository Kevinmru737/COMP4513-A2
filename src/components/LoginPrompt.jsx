// src/pages/Login.jsx

//img from https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop
import loginBg from "../assets/dj-techno-bg.jfif";

const LoginPrompt = () => {
  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center px-4 relative">
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
          Login to explore new and old passions
        </h1>
      </div>
    </div>
  );
};

export default LoginPrompt;
