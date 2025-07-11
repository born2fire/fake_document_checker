// src/pages/Report.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Report() {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (!file) return toast.error("No image selected");

    toast.success("Image uploaded successfully!");
    setUploaded(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* 💫 Background Blobs */}
      <div className="absolute top-[-80px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[40%] right-[50%] w-[200px] h-[200px] bg-fuchsia-200 opacity-20 rounded-full blur-2xl animate-pulse" />

      {/* 🧾 Upload Section */}
      <div className="z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* 🛡️ Left Info Card */}
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-fuchsia-200 shadow-xl p-6 w-full max-w-xs text-center hidden lg:flex flex-col gap-4 items-center animate-fade-in mt-[72px]">
          <div className="text-5xl">🛡️</div>
          <h3 className="text-xl font-bold text-fuchsia-700">Trusted & Verified</h3>
          <div className="flex flex-col items-start text-sm text-gray-700 gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">👁️</span>
              <span>Community Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span>Quick Uploads</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-3">
            Help keep the platform safe. Every report counts.
          </p>
        </div>

        {/* 📤 Upload Box or Success Message */}
        <div className="w-full max-w-xl bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-fuchsia-200 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-fuchsia-800 text-center mb-2">
            Upload Suspicious Image
          </h1>
          <p className="text-center text-sm text-gray-600 mb-6">
            Only JPG, JPEG, PNG files are allowed.
          </p>

          {!uploaded ? (
            <>
              {/* Upload Box */}
              <div className="mb-6">
                <label
                  htmlFor="upload-image"
                  className="w-full block border-2 border-dashed border-pink-400 bg-white text-center px-4 py-10 rounded-xl cursor-pointer hover:bg-fuchsia-50 transition"
                >
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    id="upload-image"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setUploaded(false);
                    }}
                    hidden
                  />
                  <div className="text-4xl mb-2">📤</div>
                  <p className="text-fuchsia-700 font-medium">
                    Drag or click to upload image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Accepted: .jpg, .jpeg, .png</p>
                </label>
              </div>

              {/* Image Preview */}
              {file && (
                <div className="mb-6">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full max-h-64 object-contain border rounded-xl shadow"
                  />
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                className="w-full mt-2 bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-pink-600 hover:to-fuchsia-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition"
              >
                Upload
              </button>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center flex flex-col items-center gap-4">
              <div className="text-5xl">✅</div>
              <h3 className="text-lg font-semibold text-green-700">
                Image uploaded successfully and under review!
              </h3>
              <p className="text-sm text-gray-600">
                <strong>File Name:</strong> Swayam_Gupta_photo.jpg
              </p>
            </div>
          )}

          {/* Back to Options */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/get-started")}
              className="text-fuchsia-600 hover:underline font-medium"
            >
              🔁 Go to Options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
