import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, CloudSun, Leaf, Activity, Image as ImageIcon } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [image, setImage] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disease, setDisease] = useState("");
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      simulateDetection();
    }
  };

  const startCamera = async () => {
    setUseCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch {
      alert("Camera access denied or not available.");
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
    simulateDetection();
  };

  const simulateDetection = () => {
    setLoading(true);
    setConfidence(0);
    setDisease("");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setConfidence(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setLoading(false);
        setDisease("Leaf Blight Detected 🌿");
      }
    }, 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center">

      {/* 🔥 Animated Fullscreen Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80')",
        }}
        animate={{
          scale: [1, 1.1, 1],
          filter: ["brightness(0.8)", "brightness(1)", "brightness(0.8)"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/40 to-emerald-800/50 backdrop-blur-sm" />

      {/* 🌾 Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl z-10 mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        🌾 Smart Crop Disease Detector
      </motion.h1>

      {/* 📷 Upload / Camera */}
      <motion.div
        className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 w-[90%] md:w-[28rem] flex flex-col items-center z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <label className="cursor-pointer flex flex-col items-center justify-center w-36 h-36 bg-green-100/50 border-2 border-dashed border-green-400 rounded-2xl hover:bg-green-200/60 transition-all">
            <ImageIcon size={36} className="text-green-700 mb-2" />
            <span className="text-green-800 font-semibold text-sm">Upload Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <button
            onClick={startCamera}
            className="w-36 h-36 flex flex-col items-center justify-center bg-green-100/50 border-2 border-dashed border-green-400 rounded-2xl hover:bg-green-200/60 transition-all"
          >
            <Camera size={36} className="text-green-700 mb-2" />
            <span className="text-green-800 font-semibold text-sm">Open Camera</span>
          </button>
        </div>

        {useCamera && (
          <motion.div className="relative w-72 h-64 mt-4">
            <video ref={videoRef} autoPlay className="rounded-2xl w-full h-full object-cover border border-green-300 shadow-md" />
            <button
              onClick={capturePhoto}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
            >
              Capture
            </button>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </motion.div>
        )}

        {image && !useCamera && (
          <motion.img
            src={image}
            alt="Crop Preview"
            className="mt-6 rounded-xl shadow-lg w-64 h-64 object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {loading && (
          <motion.div className="mt-6 w-28 h-28" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <CircularProgressbar
              value={confidence}
              text={`${confidence}%`}
              styles={buildStyles({
                textColor: "#14532d",
                pathColor: "#16a34a",
                trailColor: "#dcfce7",
              })}
            />
          </motion.div>
        )}

        {!loading && disease && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold text-green-800">Detected Disease</h2>
            <p className="text-lg text-green-700 mt-2">{disease}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Info */}
      <motion.footer
        className="mt-8 text-white/80 font-medium z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🌱 Empowering Farmers with AI
      </motion.footer>
    </div>
  );
}

export default App;