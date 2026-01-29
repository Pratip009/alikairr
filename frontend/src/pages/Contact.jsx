import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { Sparkles, X, CheckCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/contact/submit`, formData);

      if (data.success) {
        toast.success("Message sent successfully!");
        
        // Show AI response in modal
        setAiResponse(data.aiResponse);
        setShowResponseModal(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Address",
      details: ["123 Business Street", "New York, NY 10001", "United States"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaPhone />,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      details: ["info@company.com", "support@company.com"],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"],
      color: "from-purple-500 to-purple-600",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, link: "#", color: "hover:bg-[#1877F2]" },
    { icon: <FaTwitter />, link: "#", color: "hover:bg-[#1DA1F2]" },
    { icon: <FaLinkedinIn />, link: "#", color: "hover:bg-[#0A66C2]" },
    {
      icon: <FaInstagram />,
      link: "#",
      color: "hover:bg-gradient-to-br hover:from-[#E4405F] hover:to-[#FCAF45]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4E00] to-[#FF6B35]">
              Touch
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from
            you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              {item.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4E00] focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4E00] focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4E00] focus:border-transparent transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4E00] focus:border-transparent transition-all duration-300"
                    placeholder="How can we help?"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4E00] focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Write your message here..."
                  required
                  disabled={loading}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-[#FF4E00] to-[#FF6B35] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Map & Social Section */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-3xl shadow-2xl p-2 h-[400px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1.5rem" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>

            {/* Follow Us */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 text-lg transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-lg ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Quick Response
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium AI Response Modal */}
      {showResponseModal && aiResponse && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <style>{`
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-slide-in {
              animation: slideInUp 0.4s ease-out;
            }
            
            .glass-effect {
              background: rgba(255, 255, 255, 0.98);
              backdrop-filter: blur(20px);
            }
          `}</style>
          
          <div className="glass-effect rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border border-gray-200/50 animate-slide-in">
            {/* Premium Header */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black px-8 py-6">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center shadow-xl">
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      ALIKAIR Assistant Response
                    </h3>
                    <p className="text-gray-400 text-sm mt-0.5">Powered by advanced Groq Model</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl p-2 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(85vh-180px)]">
              {/* Success Badge */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-900">Message Received Successfully</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Our team will follow up personally within 24 hours
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Instant Response
                  </span>
                </div>
                <div className="prose prose-gray max-w-none">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
                    {aiResponse}
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">What happens next?</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                       A member of our team will review your message and provide a personalized follow-up within 24 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Footer */}
            <div className="border-t border-gray-200 px-8 py-5 bg-gray-50/50">
              <button
                onClick={() => setShowResponseModal(false)}
                className="w-full px-6 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Got it, thanks!</span>
                <CheckCircle className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;