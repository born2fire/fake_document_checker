// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// ✅ Pages
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Report from "./pages/Report";
import ViewReport from "./pages/ViewReport";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import GetStartedOptions from "./pages/GetStartedOptions";
import Results from "./pages/Results"; // ✅ You missed this before!

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100">
        <Navbar />

        {/* Main content area */}
        <div className="flex-1 pt-24 px-4 sm:px-6 md:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/report" element={<Report />} />
            <Route path="/view-report" element={<ViewReport />} />
            <Route path="/get-started" element={<GetStartedOptions />} />
            <Route path="/results" element={<Results />} /> {/* ✅ FIXED LINE */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
