import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadCard from "../Components/UploadCard";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("PAN Card");
  const [step, setStep] = useState("upload");
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setShowConfirm(false);
    setStep("uploaded");

    setTimeout(() => {
      setStep("analyzing");
      toast.loading("Analyzing your document...");

      setTimeout(() => {
        toast.dismiss();

        const simulateError = false;

        if (simulateError) {
          setError("Analysis failed due to a server error.");
          setStep("error");
        } else {
          const mockResults = {
            verdict: "Suspicious",
            confidence: 0.82,
            fileName: file.name,
            docType,
            anomalies: [
              {
                type: "location",
                message: "Unknown village: Bhupalgadh",
                confidence: 0.92,
              },
              {
                type: "grammar",
                message: "Strange phrasing: 'as per my belief'",
                sentence: "I hereby declare, as per my belief, that this is accurate.",
                suggestion: "to the best of my knowledge",
                confidence: 0.75,
              },
            ],
          };
          navigate("/results", { state: { resultData: mockResults } });
        }
      }, 2000);
    }, 2000);
  };

  const handleUpload = () => {
    if (!file) return toast.error("No file selected");
    setShowConfirm(true);
  };

  if (step === "uploaded") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-fuchsia-100 flex flex-col items-center justify-center px-6 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold text-fuchsia-700 mb-2">✅ Document Uploaded</h2>
        <p className="text-sm text-gray-600">
          Hold tight… we’re preparing to analyze your document.
        </p>
      </div>
    );
  }

  if (step === "analyzing") {
    return <Loader message="Analyzing your document for location, grammar, and duplication..." />;
  }

  if (step === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 text-center px-6">
        <h2 className="text-3xl font-bold text-red-600 mb-3">❌ Analysis Failed</h2>
        <p className="text-gray-600 mb-4 text-sm">
          {error || "Something went wrong while analyzing your document."}
        </p>
        <button
          onClick={() => {
            setStep("upload");
            setError(null);
          }}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-2 rounded-xl transition"
        >
          🔁 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* 💫 Background Blobs */}
      <div className="absolute top-[-80px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[40%] right-[50%] w-[200px] h-[200px] bg-fuchsia-200 opacity-20 rounded-full blur-2xl animate-pulse" />

      {/* Main Section */}
      <div className="z-10 max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Info Card */}
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-fuchsia-200 shadow-xl p-6 w-full max-w-xs text-center hidden lg:flex flex-col gap-4 items-center animate-fade-in mt-[72px]">
          <div className="text-5xl">🛡️</div>
          <h3 className="text-xl font-bold text-fuchsia-700">Trusted & Verified</h3>
          <div className="flex flex-col items-start text-sm text-gray-700 gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📄</span>
              <span>Smart Document Checks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span>Fast Results</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic mt-3">
            Upload with confidence. Let us handle the rest.
          </p>
        </div>

        {/* Upload Card Section */}
        <div className="w-full max-w-xl bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-fuchsia-200 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-fuchsia-800 text-center mb-2">
            Upload Document for Verification
          </h1>
          <p className="text-center text-sm text-gray-600 mb-6">
            Upload your official PDF or image. We’ll let you know if anything looks suspicious.
          </p>

          {file && (
            <div className="mb-6">
              <img
                src={URL.createObjectURL(file)}
                alt="File preview"
                className="w-full max-h-64 object-contain border rounded-xl shadow"
              />
            </div>
          )}

          <UploadCard
            file={file}
            setFile={setFile}
            docType={docType}
            setDocType={setDocType}
            isUploading={false}
            onSubmit={handleUpload}
            accept=".pdf,.jpg,.jpeg,.png"
          />

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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Are you sure?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Do you want to proceed with analyzing this document?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              >
                Yes, Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
