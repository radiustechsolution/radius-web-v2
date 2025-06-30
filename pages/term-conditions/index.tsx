import React, { useState } from "react";
import {
  FileText,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function TermsConditionsPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "registration",
      title: "Account Registration & Security",
      icon: Shield,
      content: [
        "To use our services, you may need to register an account by providing accurate and up-to-date information.",
        "You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.",
        "Notify us immediately of any unauthorized access or security breaches.",
      ],
    },
    {
      id: "services",
      title: "Services Offered",
      icon: FileText,
      content: [
        "Radius provides VTU services, including:",
        "• Airtime top-up for mobile networks",
        "• Data bundle purchases",
        "• Other value-added services as may be introduced",
        "Transactions are subject to network availability and third-party service providers.",
      ],
    },
    {
      id: "payments",
      title: "Payments & Pricing",
      icon: CheckCircle2,
      content: [
        "All prices are displayed on the Platform and are subject to change without prior notice.",
        "Payments must be made through approved methods (bank transfer, card payments, etc.).",
        "Transactions are final and non-refundable unless otherwise stated or due to technical errors.",
      ],
    },
    {
      id: "disputes",
      title: "Transaction Errors & Disputes",
      icon: AlertCircle,
      content: [
        "If a transaction fails but your account is debited, contact our support team within 24 hours with proof of transaction.",
        "We will investigate and resolve valid disputes within a reasonable time.",
      ],
    },
    {
      id: "prohibited",
      title: "Prohibited Activities",
      icon: Shield,
      content: [
        "You agree not to:",
        "• Use the Platform for fraudulent or illegal activities.",
        "• Engage in unauthorized resale of services.",
        "• Exploit system vulnerabilities or attempt unauthorized access.",
        "• Violate any applicable laws or regulations.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: FileText,
      content: [
        "Radius Tech Solutions Limited is not liable for:",
        "• Network failures or service disruptions by third-party providers.",
        "• Losses arising from incorrect transaction details provided by the user.",
        "• Indirect, incidental, or consequential damages.",
        "Our maximum liability is limited to the value of the disputed transaction.",
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
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Please read these terms carefully before using our services
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
                Welcome to <strong>Radius</strong> (&quot;the Platform&quot;), a
                digital service operated by{" "}
                <strong>Radius Tech Solutions Limited</strong> (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions
                (&quot;Terms&quot;) govern your use of our services, including
                the purchase of airtime, data, and other VTU (Virtual Top-Up)
                services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using the Platform, you (&quot;Customer,&quot;
                &quot;User,&quot; or &quot;you&quot;) agree to comply with these
                Terms. If you do not agree, please refrain from using our
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
                      {section.content.map((item, idx) => (
                        <p key={idx} className="text-gray-600 leading-relaxed">
                          {item.startsWith("•") ? (
                            <span className="flex items-start space-x-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: "#0E14A2" }}
                              ></span>
                              <span>{item.substring(2)}</span>
                            </span>
                          ) : (
                            item
                          )}
                        </p>
                      ))}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              7. Privacy Policy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your personal data is handled in accordance with our{" "}
              <strong>Privacy Policy</strong>, which is incorporated into these
              Terms.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              8. Amendments
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Continued
              use of the Platform constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              9. Termination
            </h3>
            <div className="space-y-2 text-gray-600 leading-relaxed">
              <p>
                9.1 We may suspend or terminate your access for violations of
                these Terms.
              </p>
              <p>
                9.2 You may deactivate your account by contacting customer
                support.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              10. Governing Law
            </h3>
            <p className="text-gray-600 leading-relaxed">
              These Terms are governed by the laws of the{" "}
              <strong>Federal Republic of Nigeria</strong>, and any disputes
              shall be resolved in Nigerian courts.
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
              11. Contact Us
            </h3>
            <p className="text-white/90 mb-6">
              For inquiries or support, contact:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Email</p>
                  <p className="text-white font-medium">
                    radiustechsolutions@gmail.com
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
              By using Radius, you acknowledge that you have read, understood,
              and agreed to these Terms and Conditions.
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
