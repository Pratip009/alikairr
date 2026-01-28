import { useEffect, useState } from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const socials = [
  {
    icon: <FaLinkedinIn />,
    link: "https://linkedin.com",
    label: "LinkedIn",
    bgClass: "bg-[#0A66C2]",
    hoverClass: "hover:bg-[#004182]",
  },
  {
    icon: <FaFacebookF />,
    link: "https://facebook.com",
    label: "Facebook",
    bgClass: "bg-[#1877F2]",
    hoverClass: "hover:bg-[#0C63D4]",
  },
  {
    icon: <FaTwitter />,
    link: "https://twitter.com",
    label: "Twitter",
    bgClass: "bg-[#1DA1F2]",
    hoverClass: "hover:bg-[#0C85D0]",
  },
  {
    icon: <FaInstagram />,
    link: "https://instagram.com",
    label: "Instagram",
    bgClass: "bg-gradient-to-br from-[#E4405F] via-[#F77737] to-[#FCAF45]",
    hoverClass: "hover:opacity-90",
  },
  {
    icon: <FaEnvelope />,
    link: "mailto:yourmail@gmail.com",
    label: "Gmail",
    bgClass: "bg-[#EA4335]",
    hoverClass: "hover:bg-[#C5221F]",
  },
];

const FloatingSocials = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const footer = document.getElementById("footer");

      if (!hero || !footer) return;

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const footerTop = footer.offsetTop;
      const scrollY = window.scrollY + window.innerHeight / 2;

      setVisible(scrollY > heroBottom && scrollY < footerTop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed left-6 bottom-3 z-50 hidden md:flex flex-col gap-0">
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noreferrer"
          className={`group relative w-12 h-12 flex items-center justify-center text-white text-xl shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-x-1 hover:shadow-2xl ${item.bgClass} ${item.hoverClass}`}
        >
          {item.icon}

          <span className="absolute left-16 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-xl pointer-events-none">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;
