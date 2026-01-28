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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
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
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF4E00] to-[#FF6B35] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Send Message
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
    </div>
  );
};

export default Contact;
