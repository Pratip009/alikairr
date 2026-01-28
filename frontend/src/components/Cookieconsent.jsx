import React, { useState, useEffect } from "react";
import { FaCookie, FaTimes, FaCheck, FaCog } from "react-icons/fa";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after a small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // You can add your analytics/tracking initialization here
    // initializeAnalytics();
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem("cookieConsent", JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
    
    // Initialize services based on preferences
    if (preferences.analytics) {
      // initializeAnalytics();
    }
    if (preferences.marketing) {
      // initializeMarketing();
    }
  };

  const togglePreference = (key) => {
    if (key === "necessary") return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fadeIn"></div>

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slideUp">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {!showPreferences ? (
            // Main Banner
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon and Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <FaCookie className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                      </p>
                    </div>
                  </div>

                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 hover:underline"
                  >
                    Read our Privacy Policy →
                  </a>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 md:min-w-[200px]">
                  <button
                    onClick={handleAcceptAll}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <FaCheck /> Accept All
                  </button>
                  
                  <button
                    onClick={handleRejectAll}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    <FaTimes /> Reject All
                  </button>
                  
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
                  >
                    <FaCog /> Customize
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Preferences Panel
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Necessary Cookies
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Essential for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="sr-only"
                      />
                      <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center cursor-not-allowed opacity-50">
                        <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("analytics")}
                      className="relative"
                    >
                      <div
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          preferences.analytics ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            preferences.analytics ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Marketing Cookies
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Used to track visitors and display relevant ads.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("marketing")}
                      className="relative"
                    >
                      <div
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          preferences.marketing ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            preferences.marketing ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Functional Cookies
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Enable enhanced functionality and personalization.
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("functional")}
                      className="relative"
                    >
                      <div
                        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                          preferences.functional ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            preferences.functional ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FaCheck /> Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsent;