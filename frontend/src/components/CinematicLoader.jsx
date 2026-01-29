import React, { useState, useEffect } from 'react';

const CinematicLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 3000; // 3 seconds
    const steps = 60;
    const interval = duration / steps;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 100 / steps;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onLoadComplete();
          }, 800); // Match exit animation duration
        }, 500);
      }
      setProgress(currentProgress);
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse" />
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Logo or title animation */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            <span className="inline-block animate-glow">ALIKAIR</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 animate-fade-in-delay">
            Healthcare Staffing Solution
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm font-mono">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Loading text animation */}
        <div className="mt-8 text-gray-500 text-sm tracking-widest animate-pulse">
          LOADING
          <span className="inline-block animate-dots">...</span>
        </div>
      </div>

      {/* Film grain effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] animate-grain" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}20px);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.5),
                         0 0 40px rgba(168, 85, 247, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(168, 85, 247, 0.8),
                         0 0 60px rgba(168, 85, 247, 0.5),
                         0 0 80px rgba(168, 85, 247, 0.3);
          }
        }

        @keyframes dots {
          0%, 20% {
            content: '.';
          }
          40% {
            content: '..';
          }
          60%, 100% {
            content: '...';
          }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 2s ease-out;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-dots {
          animation: dots 1.5s steps(3, end) infinite;
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </div>
  );
};

export default CinematicLoader;