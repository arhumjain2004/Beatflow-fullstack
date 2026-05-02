import React from "react";

function MusicCard({ music, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition duration-300 cursor-pointer shadow-lg"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={`https://picsum.photos/300/300?random=${music._id}`}
          alt="cover"
          className="rounded-lg mb-4 w-full h-[180px] object-cover"
        />

        {/* Play Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
          <div className="bg-green-500 p-3 rounded-full shadow-lg">
            ▶
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg truncate">
        {music.title}
      </h3>

      {/* Artist */}
      <p className="text-gray-400 text-sm truncate">
        {music.artist?.username || "Unknown Artist"}
      </p>
    </div>
  );
}

export default MusicCard;