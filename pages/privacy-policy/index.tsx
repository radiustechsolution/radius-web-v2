import React, { useState } from "react";
import {
  Shield,
  Database,
  Eye,
  Lock,
  Users,
  Settings,
  Clock,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "information",
      title: "Information We Collect",
      icon: Database,
      content: [
        "We may collect the following information:",
        "",
        "1.1 Personal Information",
        "• Full name",
        "• Email address",
        "• Phone number",
        "• Bank account/card details (for transactions)",
        "• BVN (where required for verification)",
        "",
        "1.2 Transactional Data",
        "• Airtime/data purchase history",
        "• Payment records",
        "• Device and IP address information",
        "",
        "1.3 Technical & Usage Data",
        "• Cookies and session data",
        "• Browser type and version",
        "• Operating system",
      ],
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: Settings,
      content: [
        "We use your data for:",
        "• Processing transactions (airtime, data, VTU services)",
        "• Account verification and security",
        "• Customer support and dispute resolution",
        "• Improving our services and user experience",
        "• Fraud prevention and legal compliance",
        "• Marketing (with your consent)",
      ],
    },
    {
      id: "sharing",
      title: "Data Sharing & Disclosure",
      icon: Users,
      content: [
        "We may share your information with:",
        "• Payment processors & banks (to complete transactions)",
        "• Telecommunication providers (to fulfill VTU services)",
        "• Law enforcement (if required by law)",
        "• Third-party service providers (for analytics, security, and support)",
        "",
        "We do not sell your personal data to third parties for marketing purposes.",
      ],
    },
    {
      id: "security",
      title: "Data Security",
      icon: Lock,
      content: [
        "• We implement SSL encryption and security measures to protect your data.",
        "• However, no online service is 100% secure—use strong passwords and report suspicious activity.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking Technologies",
      icon: Eye,
      content: [
        "• We use cookies to enhance user experience and analyze traffic.",
        "• You can disable cookies in your browser settings, but some features may not work.",
      ],
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        "You have the right to:",
        "• Access, update, or delete your personal data",
        "• Opt out of marketing communications",
        "• Withdraw consent (where applicable)",
        "• Request data portability",
        "",
        "To exercise these rights, contact us at support@radius.com.ng.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0E14A2" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-2 border-white"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border border-white"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 text-white/90">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Last Updated: 30th June 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Radius
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to <strong>Radius</strong>, operated by{" "}
                <strong>Radius Tech Solutions Limited</strong> (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). This Privacy Policy
                explains how we collect, use, disclose, and protect your
                personal information when you use our services, including
                airtime, data, and VTU purchases.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using <strong>radius.com.ng</strong> (&quot;the
                Platform&quot;), you consent to the practices described in this
                policy. If you do not agree, please refrain from using our
                services.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#0E14A2" }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {index + 1}. {section.title}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="ml-16 space-y-3">
                      {section.content.map((item, idx) => {
                        if (item === "") {
                          return <div key={idx} className="h-2"></div>;
                        }
                        return (
                          <p
                            key={idx}
                            className="text-gray-600 leading-relaxed"
                          >
                            {item.startsWith("•") ? (
                              <span className="flex items-start space-x-2">
                                <span
                                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: "#0E14A2" }}
                                ></span>
                                <span>{item.substring(2)}</span>
                              </span>
                            ) : item.startsWith("1.") ? (
                              <span className="font-semibold text-gray-800">
                                {item}
                              </span>
                            ) : (
                              item
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Sections */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#0E14A2" }}
              >
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                7. Data Retention
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-2">
              We retain your information only as long as necessary for:
            </p>
            <div className="space-y-1">
              <p className="text-gray-600 flex items-start space-x-2">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#0E14A2" }}
                ></span>
                <span>Service delivery</span>
              </p>
              <p className="text-gray-600 flex items-start space-x-2">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#0E14A2" }}
                ></span>
                <span>Legal compliance</span>
              </p>
              <p className="text-gray-600 flex items-start space-x-2">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "#0E14A2" }}
                ></span>
                <span>Fraud prevention</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#0E14A2" }}
              >
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                8. Children&apos;s Privacy
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our services are <strong>not</strong> intended for users under{" "}
              <strong>13</strong>. If we discover a child&apos;s data was
              collected, we will delete it.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#0E14A2" }}
              >
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                9. Changes to This Policy
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy. Continued use of the Platform
              means you accept the revised terms.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 border border-gray-200"
            style={{ backgroundColor: "#0E14A2" }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              10. Contact Us
            </h3>
            <p className="text-white/90 mb-6">
              For privacy-related concerns, contact:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Email</p>
                  <p className="text-white font-medium">
                    support@radius.com.ng
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Phone</p>
                  <p className="text-white font-medium">+234 814 131 4105</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Address</p>
                  <p className="text-white font-medium">
                    ARO FAGBAMILA L/OUT ORITA OBELE AKURE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              By using Radius, you acknowledge that you have read and understood
              this Privacy Policy.
            </p>
            <div className="text-gray-900 font-semibold">
              <p>Radius Tech Solutions Limited</p>
              <p className="text-gray-500 text-sm mt-1">
                © 2025 – All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
}
