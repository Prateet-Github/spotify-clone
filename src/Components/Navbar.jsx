import { Home, Search, Bell } from "lucide-react";

export const Navbar = () => {
  const handleLogin = () => {
    window.location.href = "https://505e47bd9f35.ngrok-free.app/login";
  };

  return (
    <nav className="flex items-center justify-between bg-[#000000] px-6 py-4 fixed top-0 w-full z-50 shadow">
      {/* Left: Logo and navigation */}
      <div className="flex items-center space-x-6">
        <span className="text-green-500 font-bold text-xl tracking-tight">
          Spotify
        </span>
        <img
          src="/Images/spotify.png"
          alt="spotify"
          className="h-8 w-8 rounded-full"
        />
      </div>
      {/* Center: Search */}
      <div className="flex items-center w-1/3">
        <button className="flex items-center space-x-2 size-8  text-gray-200 hover:text-white mr-4">
          <Home className="" size={22} />
        </button>
        <div className="flex items-center bg-[#242424] rounded-full px-4 py-2 w-full">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent outline-none text-gray-200 w-full"
          />
        </div>
      </div>
      {/* Right: Notifications and profile */}
      <div className="flex items-center space-x-4">
        <Bell
          className="text-gray-200 hover:text-white cursor-pointer"
          size={22}
        />

        <div className=" flex h-12 w-12 rounded-full justify-center items-center bg-gray-900">
          {" "}
          <img
            src="/Images/profile.jpeg"
            alt="profile"
            className="text-gray-200 hover:text-white cursor-pointer h-8 w-8 rounded-full"
            onClick={handleLogin}
          />
        </div>
      </div>
    </nav>
  );
};
