import React, { useState, useEffect } from "react";
import ScrollToTop from "../components/scrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/Cookieconsent";
import CinematicLoader from "../components/CinematicLoader";
import FloatingSocials from "../components/FloatingSocials";

const AppLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setContentLoaded] = useState(false);

  useEffect(() => {
    // Preload content - wait for DOM to be ready
    const handleLoad = () => {
      setContentLoaded(true);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setContentLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <CinematicLoader onLoadComplete={handleLoadComplete} />}
      
      <main 
        className={`w-full m-auto overflow-hidden transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Navbar />
        <ScrollToTop />
        {children}
        <FloatingSocials />
        <Footer />
        <CookieConsent />
      </main>
    </>
  );
};

export default AppLayout;