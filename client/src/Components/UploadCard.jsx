import React from "react";
import { CloudUpload, CheckCircle, Loader2 } from "lucide-react";

const docTypes = ["Aadhar Card", "PAN Card"];

export default function UploadCard({ file, setFile, docType, setDocType, onSubmit, isUploading, accept }) {
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (
      uploadedFile &&
      ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(uploadedFile.type)
    ) {
      setFile(uploadedFile);
    } else {
      alert("Only PDF, JPG, JPEG, or PNG files are allowed.");
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-xl border border-fuchsia-200 hover:shadow-fuchsia-400 transition duration-300 transform hover:scale-[1.02] animate-fade-in">
      <div className="flex flex-col gap-5 items-center">
        {/* Upload Box */}
        <label
          htmlFor="fileInput"
          className="w-full cursor-pointer border-2 border-dashed border-fuchsia-400 rounded-2xl p-6 text-center hover:bg-fuchsia-50 transition duration-200 hover:scale-[1.02]"
        >
          {file ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <p className="text-sm font-medium text-gray-800">{file.name}</p>
              <p className="text-xs text-gray-500">Click to replace file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-fuchsia-600">
              <CloudUpload className="h-10 w-10" />
              <p className="text-md mt-2 font-semibold">
                Drag or click to upload {accept.includes("pdf") ? "file" : "image"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                (Only PDF, JPG, JPEG, PNG allowed)
              </p>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Dropdown */}
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="w-full px-4 py-2 border border-fuchsia-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 hover:ring-2 hover:ring-pink-300 font-medium transition duration-200"
        >
          {docTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        {/* Upload Button */}
        <button
          onClick={onSubmit}
          disabled={isUploading}
          className="bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-pink-500 hover:to-fuchsia-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-xl transition duration-300 w-full flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> <span>Analyzing...</span>
            </>
          ) : (
            "Upload & Analyze"
          )}
        </button>
      </div>
    </div>
  );
}
