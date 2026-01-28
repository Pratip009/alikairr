import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200" id="footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Brand */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={assets.logo}
                alt="Alikair Logo"
                className="w-[130px] object-contain"
              />
            </Link>

            <span className="hidden sm:block text-gray-300 text-xl">|</span>

            <p className="text-gray-600 text-sm max-w-md">
              Alikair is a modern platform built to deliver seamless digital
              experiences with speed, trust, and simplicity.
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {[
              { icon: assets.facebook_icon, label: "Facebook" },
              { icon: assets.twitter_icon, label: "Twitter" },
              { icon: assets.instagram_icon, label: "Instagram" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                aria-label={item.label}
                className="group w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-700">Alikair</span>. All
            rights reserved.
          </p>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
