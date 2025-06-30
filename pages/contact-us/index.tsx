import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full border-2 border-blue-900"></div>
        <div className="absolute top-40 right-32 w-64 h-64 rounded-full border border-blue-900"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full border-2 border-blue-900"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Get In
            <span className="text-blue-900" style={{ color: "#0E14A2" }}>
              {" "}
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Contact us using the information provided below. We&apos;re here to
            help and will respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Let&apos;s Connect
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div
                    className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#0E14A2" }}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email us at</p>
                    <p className="text-gray-900 text-lg font-medium">
                      radiustechsolution@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div
                    className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#0E14A2" }}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Call us at</p>
                    <p className="text-gray-900 text-lg font-medium">
                      +234 814 131 4105
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div
                    className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#0E14A2" }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Visit our office</p>
                    <p className="text-gray-900 text-lg font-medium">
                      ARO FAGBAMILA L/OUT ORITA OBELE AKURE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 text-center">
                <Clock
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: "#0E14A2" }}
                />
                <p className="text-2xl font-bold text-gray-900">24h</p>
                <p className="text-gray-500 text-sm">Response Time</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 text-center">
                <Users
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: "#0E14A2" }}
                />
                <p className="text-2xl font-bold text-gray-900">300+</p>
                <p className="text-gray-500 text-sm">Happy Clients</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 text-center">
                <CheckCircle
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: "#0E14A2" }}
                />
                <p className="text-2xl font-bold text-gray-900">99%</p>
                <p className="text-gray-500 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-all duration-300"
                    placeholder="Your Name"
                    required
                  />
                  {focusedField === "name" && (
                    <div
                      className="absolute -top-2 left-3 text-white text-xs px-2 py-1 rounded animate-fadeIn"
                      style={{ backgroundColor: "#0E14A2" }}
                    >
                      Full Name
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-all duration-300"
                    placeholder="Your Email"
                    required
                  />
                  {focusedField === "email" && (
                    <div
                      className="absolute -top-2 left-3 text-white text-xs px-2 py-1 rounded animate-fadeIn"
                      style={{ backgroundColor: "#0E14A2" }}
                    >
                      Email Address
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField("")}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-all duration-300"
                  placeholder="Subject"
                  required
                />
                {focusedField === "subject" && (
                  <div
                    className="absolute -top-2 left-3 text-white text-xs px-2 py-1 rounded animate-fadeIn"
                    style={{ backgroundColor: "#0E14A2" }}
                  >
                    Message Subject
                  </div>
                )}
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  rows={6}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
                {focusedField === "message" && (
                  <div
                    className="absolute -top-2 left-3 text-white text-xs px-2 py-1 rounded animate-fadeIn"
                    style={{ backgroundColor: "#0E14A2" }}
                  >
                    Your Message
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="w-full text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style={{ backgroundColor: "#0E14A2" }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center animate-fadeIn">
                Thanks for reaching out! We&apos;ll get back to you within 24
                hours.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        input:focus,
        textarea:focus {
          border-color: #0e14a2 !important;
        }
      `}</style> */}
    </div>
  );
}
