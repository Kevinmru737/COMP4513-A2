// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import supabase from "../../../supabase";

const ADMIN_EMAIL = "admin@admin.xxx";
const ADMIN_PASSWORD = "password";
const USER_EMAIL = "user@user.com";
const USER_PASSWORD = "password";

const LoginFormView = (props) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (authError) {
      setError(authError);
      throw new Error(authError.message);
    } else {
      setLoggedIn(true);
      navigate("/"); // Redirect to home
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative z-10 px-4">
      <div className="bg-gray-800 p-12 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Login
        </h2>
        {/* Error toast */}
        {error && (
          <div className="bg-red-900/60 border border-red-700 text-red-200 text-sm px-4 py-3 mb-4 rounded-xl flex justify-between items-center">
            {error.message}
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-white ml-4"
            >
              ✕
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 outline-none"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
      <div className="bg-gray-800  m-4 p-4 rounded-lg shadow-2xl text-gray-300 w-full max-w-md flex flex-col">
        <span className="text-gray-200 text-lg flex items-center justify-center font-bold">
          Login Info
        </span>
        <div className="flex flex-col mb-3 ">
          <span className="text-base text-gray-200 italic">Admin Account</span>

          <span className="text-bold">Email: {ADMIN_EMAIL}</span>
          <span>Password: {ADMIN_PASSWORD}</span>
        </div>

        <div className="flex flex-col ">
          <span className="text-base text-gray-200 italic">User Account</span>

          <span className="text-bold">Email: {USER_EMAIL}</span>
          <span>Password: {USER_PASSWORD}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginFormView;
