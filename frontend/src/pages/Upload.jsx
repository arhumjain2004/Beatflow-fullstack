import { useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Please add title and file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("music", file);
      formData.append("title", title);

      // ✅ No need to manually add token (interceptor already does it)
      await API.post("/music/upload", formData);

      alert("Uploaded successfully 🎉");

      setFile(null);
      setTitle("");

    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-black via-zinc-900 to-black text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center px-6">
        <div className="bg-zinc-900/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-[420px] border border-zinc-800">

          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 text-center">
            🎵 Upload Music
          </h2>

          {/* Song Title */}
          <input
            type="text"
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* File Upload */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-400">
              Select audio file
            </label>

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          {/* Preview */}
          {file && (
            <p className="text-sm text-gray-400 mt-4 text-center">
              Selected: {file.name}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}