"use client";

import { useState, useEffect } from "react";

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Launch date - 30 günden soň
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  const timeUntilLaunch = launchDate.getTime() - currentTime.getTime();
  const days = Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeUntilLaunch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (timeUntilLaunch % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((timeUntilLaunch % (1000 * 60)) / 1000);

  const floatingElements = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingElements}

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand area */}
          <div
            className={`mb-8 transform transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl animate-bounce">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 animate-pulse">
              Coming Soon
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full animate-pulse"></div>
          </div>

          {/* Description */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Täze we ajaýyp bir başlangyjy garaşyň. <br />
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                Ýakyn wagtda açylýar!
              </span>
            </p>
          </div>

          {/* Email signup */}
          <div
            className={`transform transition-all duration-1000 delay-900 ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email salgyňyzy giriziň"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 whitespace-nowrap">
                  Habarlama
                </button>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div
            className={`transform transition-all duration-1000 delay-1100 ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="flex justify-center space-x-6">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                (social, index) => (
                  <button
                    key={social}
                    className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded group-hover:rotate-12 transition-transform duration-300"></div>
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div
            className={`mt-16 transform transition-all duration-1000 delay-1300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Taýynlyk derejesi</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-2000 ease-out"
                  style={{ width: mounted ? "85%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
