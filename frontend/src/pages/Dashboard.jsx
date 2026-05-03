import { useEffect, useState, useRef } from "react";
import {toast} from "react-hot-toast";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [music, setMusic] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

  const audioRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

  useEffect(() => {
  fetchMusic(1);   // 👈 pagination ke liye page 1
}, []);

  // 🎧 Play / Pause control
  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

 const fetchMusic = async (pageNumber = 1) => {
  try {
    const res = await API.get(`/api/music?page=${pageNumber}`);

    if (pageNumber === 1) {
      setMusic(res.data.musics);
    } else {
      setMusic((prev) => [...prev, ...res.data.musics]);
    }

    if (pageNumber >= res.data.totalPages) {
      setHasMore(false);
    }

  } catch (err) {
    console.log(err);
  }
};

  const handleDelete = async (id) => {
  try {
await API.delete(`/api/music/${id}`);

    setMusic((prev) => prev.filter((m) => m._id !== id));

    toast.success("Song deleted 🎉"); // ✅ yaha
  } catch (err) {
    console.log(err);

    toast.error("Delete failed ❌"); // ❌ error yaha
  }
};

  const handlePlay = (song, index) => {
    if (currentSong?._id === song._id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const next = (currentIndex + 1) % music.length;
    setCurrentSong(music[next]);
    setCurrentIndex(next);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prev = (currentIndex - 1 + music.length) % music.length;
    setCurrentSong(music[prev]);
    setCurrentIndex(prev);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (e.target.value / 100) * audio.duration;
    setProgress(e.target.value);
  };

  return (
    <>
      <div className="flex bg-gradient-to-b from-black via-zinc-900 to-black text-white min-h-screen">
        <Sidebar />

        <div  className="flex-1 p-10 w-full pb-40">
            <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-10">🎧 Your Music</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8  w-full justify-items-center">
            {music.length === 0 ? (
              <p>No songs uploaded yet</p>
            ) : (
              music.map((m, index) => (
                <div
                  key={m._id}
                  onClick={() => handlePlay(m, index)}
                  className="group relative w-[220px] bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 hover:scale-105 transition duration-300 cursor-pointer shadow-lg"
                >
                   {m.artist?._id === userId && (
  <button
    onClick={(e) => {
      e.stopPropagation();

      toast((t) => (
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Delete this song?</span>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-white"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                handleDelete(m._id);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ));
    }}
    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition z-20 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
  >
    Delete
  </button>
)}
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={`https://picsum.photos/300/300?random=${m._id}`}
                      className="rounded-lg mb-4"
                    />

                    {/* Play icon */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                      <div className="bg-green-500 p-3 rounded-full shadow-lg">
                        ▶
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg truncate">
                    {m.title}
                  </h3>

                  {/* Artist */}
                  <p className="text-sm text-gray-400 truncate">
                    {m.artist?.username || "Unknown Artist"}
                  </p>

                </div>
              ))
            )}
            
          </div>
          {hasMore && (
  <div className="flex justify-center items-center w-full mt-10">
    <button
      onClick={() => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchMusic(nextPage);
      }}
      className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 rounded-full shadow-lg hover:scale-105 transition duration-300 text-white font-semibold"
    >
      Load More
    </button>
  </div>
)}
 </div>
        </div>
      </div>

      

      {/* 🎧 PLAYER */}
    {currentSong && (
  <div className="fixed bottom-0 left-0 w-full  bg-gradient-to-r from-zinc-900 to-black px-6 py-3 border-t border-zinc-700 shadow-2xl">

    {/* TOP ROW */}
    <div className="relative flex items-center mb-2">

      {/* LEFT */}
      <div className="w-1/3">
        <h3 className="font-semibold">{currentSong.title}</h3>
        <p className="text-sm text-gray-400">
          {currentSong.artist?.username}
        </p>
      </div>

      {/* CENTER CONTROLS */}
     <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-xl">
        <button onClick={handlePrev}>⏮️</button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-black font-bold shadow-lg hover:scale-105 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={handleNext}>⏭️</button>
      </div>

      {/* RIGHT EMPTY */}
      <div className="w-1/3"></div>
    </div>

    {/* PROGRESS */}
    <input
      type="range"
      value={progress}
      onChange={handleSeek}
      className="w-full accent-green-500 cursor-pointer"
    />

    {/* AUDIO */}
    <audio
      ref={audioRef}
      src={currentSong.uri}
      onTimeUpdate={handleTimeUpdate}
    />
  </div>
)}
    </>
  );
}