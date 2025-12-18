"use client";
import Navbar from "./Navbar";
import React from "react";

const Hero = () => {
  const video = "/v1.mp4"; // Single video
  const title = "HOUSE OF ESAMA";
  const subtitle = "[ ETHAN ]";

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
      {/* Single video (fullscreen, looped) */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-6">
        {/* Logo and Text + Visit Button */}
        <div className="absolute bottom-40 left-4 z-10">
          {/* Orange Logo Square */}
          <div className="mb-4 w-25 h-25 flex items-center justify-center bg-[#f6762a] rounded-sm">
            <span className="font-bold text-white text-2xl">AW.</span>
          </div>

          {/* Text and Visit Button with Blend Modes */}
          <div className="text-left">
            <p
              className="text-white text-sm md:text-lg mb-1"
              style={{
                mixBlendMode: "difference",
                textShadow: "0 0 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              Website of the Week
            </p>
            <h2
              className="text-white mestika text-2xl md:text-6xl mb-2"
              style={{
                mixBlendMode: "difference",
              }}
            >
              {title}
            </h2>
            <p
              className="text-white sans text-sm md:text-lg mb-4"
              style={{
                mixBlendMode: "difference",
                textShadow: "0 0 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              {subtitle}
            </p>
            <button
              className="px-4 py-2 bg-white text-black rounded-sm font-medium hover:bg-white/90 transition-colors"
              style={{ mixBlendMode: "difference" }}
            >
              Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
