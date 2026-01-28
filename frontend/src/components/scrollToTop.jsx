import { useEffect,useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [showScrollTop,setShowScrollTop] = useState(false);
  const [scrollProgress,setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      
      setShowScrollTop(window.scrollY > 300);
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll",handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll",handleScroll);
  },[]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="group fixed right-6 bottom-3 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,78,0,0.5)] animate-bounce-slow"
      aria-label="Scroll to top"
      style={{
        animation: "bounce-slow 3s ease-in-out infinite"
      }}
    >
      {/* Progress Circle */}
      <svg className="absolute inset-0 w-14 h-14 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="#FFE5DB"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="url(#gradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4E00" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
      </svg>

      {/* Icon */}
      <div className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FF4E00] to-[#FF6B35] text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-10deg]">
        <FaArrowUp className="text-sm" />
      </div>

      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF4E00] to-[#FF6B35] opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></span>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </button>
  );
};

export default ScrollToTop;