import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const menu = [
    { name: "Home", path: "/dashboard", icon: "🏠" },

    // 🔥 ONLY ARTIST
    ...(user?.role === "artist"
      ? [{ name: "Upload", path: "/upload", icon: "⬆️" }]
      : []),

    { name: "Login", path: "/", icon: "🔑" },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white flex flex-col px-6 py-6 border-r border-zinc-800">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-green-500 mb-12">
        🎧 BeatFlow
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${
                active
                  ? "bg-zinc-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 🔥 USER + LOGOUT SECTION */}
      {user && (
        <div className="mt-auto pt-10 border-t border-zinc-800">

          {/* User Info */}
          <p className="text-gray-400 text-sm">Logged in as</p>
          <p className="text-green-400 font-semibold mb-4">
            {user.username}
          </p>

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-500">
            🎵 Your Music App <br />
            © 2026 Arhum Jain
          </p>
        </div>
      )}

    </div>
  );
}

