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
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft gradient orbs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl animate-rotate-slow" />
        
        {/* Floating medical icons/particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-gentle opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {i % 3 === 0 ? (
              // Medical cross
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : i % 3 === 1 ? (
              // Heartbeat
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-400">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              // Circle
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400" />
            )}
          </div>
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {/* Logo/Brand with premium typography */}
        <div className="mb-16 animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-900 mb-6 tracking-tight leading-none">
            <span className="inline-block animate-shimmer bg-gradient-to-r from-gray-800 via-blue-600 to-gray-800 bg-[length:200%_100%] bg-clip-text">
              ALIKAIR
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-light tracking-[0.3em] uppercase animate-fade-in-delay">
            Healthcare Staffing Excellence
          </p>
        </div>

        {/* Premium progress bar */}
        <div className="w-full max-w-md mx-auto animate-fade-in-delay-2">
          <div className="relative h-1.5 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm mb-4">
            {/* Background shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></div>
            {/* Progress bar */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 transition-all duration-300 ease-out rounded-full shadow-lg shadow-blue-500/50"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing effect on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide"></div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-500 font-light tracking-wider">
              Loading Experience
            </p>
            <p className="text-gray-700 font-medium tabular-nums">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Elegant loading text */}
        <div className="mt-12 animate-fade-in-delay-3">
          <p className="text-gray-400 text-sm font-light tracking-[0.2em] uppercase">
            Preparing Your Journey
            <span className="inline-block animate-pulse-dots ml-1">...</span>
          </p>
        </div>
      </div>

      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.15;
          }
          100% {
            transform: translateY(-120vh) translateX(30px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
          40% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-2 {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          60% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-3 {
          0% {
            opacity: 0;
          }
          70% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.08);
          }
        }

        @keyframes rotate-slow {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes pulse-dots {
          0%, 20% {
            opacity: 0.3;
          }
          40% {
            opacity: 0.6;
          }
          60%, 100% {
            opacity: 1;
          }
        }

        .animate-float-gentle {
          animation: float-gentle linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 2s ease-out;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 2s ease-out;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in-delay-3 2.5s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }

        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }

        .animate-pulse-dots {
          animation: pulse-dots 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CinematicLoader;