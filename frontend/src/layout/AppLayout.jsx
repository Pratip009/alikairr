import React from "react";
import ScrollToTop from "../components/scrollToTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieConsent from "../components/Cookieconsent";


const AppLayout = ({ children }) => {
  return (
    <main className="w-full m-auto overflow-hidden">
      <Navbar />
      <ScrollToTop />
      {children}
      <Footer />
      <CookieConsent /> 
    </main>
  );
};

export default AppLayout;