/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaCookie, FaTimes, FaCheck, FaCog } from "react-icons/fa";

const CookieConsentWithAnalytics = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      initializeServices(savedPreferences);
    }
  }, []);

  const initializeServices = (prefs) => {
    // Initialize Google Analytics
    if (prefs.analytics) {
      initializeGoogleAnalytics();
    }

    // Initialize Facebook Pixel
    if (prefs.marketing) {
      initializeFacebookPixel();
    }

    // Initialize other functional services
    if (prefs.functional) {
      initializeFunctionalServices();
    }
  };

  const initializeGoogleAnalytics = () => {
    // Example: Google Analytics 4
    if (typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
      console.log("Google Analytics initialized");
    }
  };

  const initializeFacebookPixel = () => {
    // Example: Facebook Pixel
    if (typeof window.fbq !== "undefined") {
      window.fbq("consent", "grant");
      console.log("Facebook Pixel initialized");
    }
  };

  const initializeFunctionalServices = () => {
    // Initialize any functional cookies/services
    console.log("Functional services initialized");
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);
    initializeServices(allAccepted);

    // Track consent acceptance
    trackConsentEvent("accept_all");
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
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);

    // Track consent rejection
    trackConsentEvent("reject_all");
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowBanner(false);
    setShowPreferences(false);
    initializeServices(preferences);

    // Track custom preferences
    trackConsentEvent("custom_preferences", preferences);
  };

  const togglePreference = (key) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const trackConsentEvent = (action, prefs = null) => {
    // Track consent events (only if analytics is already granted)
    const currentConsent = localStorage.getItem("cookieConsent");
    if (currentConsent) {
      const parsed = JSON.parse(currentConsent);
      if (parsed.analytics && typeof window.gtag !== "undefined") {
        window.gtag("event", "cookie_consent", {
          consent_action: action,
          preferences: prefs,
        });
      }
    }
  };

  // Function to revoke consent (can be called from settings page)
  const revokeConsent = () => {
    localStorage.removeItem("cookieConsent");
    localStorage.removeItem("cookieConsentDate");
    setShowBanner(true);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  // Expose function to show banner again (for cookie settings page)
  useEffect(() => {
    window.showCookieSettings = () => {
      setShowBanner(true);
      setShowPreferences(true);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fadeIn"></div>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slideUp">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          {!showPreferences ? (
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
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
                <CookieCategory
                  title="Necessary Cookies"
                  description="Essential for the website to function properly. Cannot be disabled."
                  enabled={true}
                  disabled={true}
                />

                <CookieCategory
                  title="Analytics Cookies"
                  description="Help us understand how visitors interact with our website."
                  enabled={preferences.analytics}
                  onToggle={() => togglePreference("analytics")}
                />

                <CookieCategory
                  title="Marketing Cookies"
                  description="Used to track visitors and display relevant ads."
                  enabled={preferences.marketing}
                  onToggle={() => togglePreference("marketing")}
                />

                <CookieCategory
                  title="Functional Cookies"
                  description="Enable enhanced functionality and personalization."
                  enabled={preferences.functional}
                  onToggle={() => togglePreference("functional")}
                />
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
      `}</style>
    </>
  );
};

// Reusable Cookie Category Component
const CookieCategory = ({ title, description, enabled, onToggle, disabled = false }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`relative ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
              enabled ? "bg-blue-600" : "bg-gray-300"
            } ${disabled ? "opacity-50" : ""}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            ></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CookieConsentWithAnalytics;