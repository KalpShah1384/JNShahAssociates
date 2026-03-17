import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, AlertTriangle, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 pt-32 pb-24">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl p-12 rounded-3xl border border-gray-200"
        >
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Privacy Policy & Data Protection
            </h1>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed">

            {/* Compliance Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-blue-500" />
                <span className="text-blue-700 font-semibold">
                  Compliance Notice
                </span>
              </div>
              <p className="text-sm">
                This Privacy Policy complies with the Information Technology Act,
                2000 (IT Act), Information Technology Rules, 2011, and the General
                Data Protection Regulation (GDPR) where applicable to EU data
                subjects.
              </p>
            </div>

            {/* 1 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-500" />
                <span>1. Information Collection</span>
              </h2>

              <p className="mb-4">
                We collect information that you provide through contact forms,
                consultation bookings, or direct communication.
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, residential/business address
                </li>
                <li>
                  <strong>Financial Information:</strong> PAN, Aadhaar number,
                  bank account details
                </li>
                <li>
                  <strong>Business Information:</strong> Company registration
                  details
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser
                  type, device information, cookies
                </li>
                <li>
                  <strong>Communication Records:</strong> Emails, meetings and
                  call recordings (with consent)
                </li>
              </ul>
            </div>

            {/* 2 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>2. Legal Basis for Processing (GDPR)</span>
              </h2>

              <p className="mb-4">
                For EU data subjects, we process personal data under the
                following legal bases:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>
                  <strong>Contract Performance:</strong> Providing accounting
                  services
                </li>
                <li>
                  <strong>Legal Obligations:</strong> Compliance with tax laws
                  and ICAI regulations
                </li>
                <li>
                  <strong>Legitimate Interest:</strong> Improving services and
                  managing relationships
                </li>
                <li>
                  <strong>Consent:</strong> Marketing communication where
                  explicitly approved
                </li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-blue-500" />
                <span>3. Data Security & Confidentiality</span>
              </h2>

              <p className="mb-4">
                We follow strict confidentiality standards under professional
                accounting regulations and implement the following security
                measures:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>
                  <strong>Encryption:</strong> AES-256 encryption
                </li>
                <li>
                  <strong>Access Control:</strong> Role-based access with MFA
                </li>
                <li>
                  <strong>Secure Storage:</strong> SOC 2 compliant cloud
                  infrastructure
                </li>
                <li>
                  <strong>Data Minimization:</strong> Only required data is
                  collected
                </li>
                <li>
                  <strong>Security Audits:</strong> Regular vulnerability
                  assessments
                </li>
              </ul>
            </div>

            {/* 4 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                4. Data Sharing & Third Parties
              </h2>

              <p className="mb-4">
                We may share your data with trusted parties including:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>
                  <strong>Government Authorities:</strong> For tax compliance
                </li>
                <li>
                  <strong>Professional Advisors:</strong> Lawyers and auditors
                </li>
                <li>
                  <strong>Service Providers:</strong> Secure cloud platforms
                </li>
                <li>
                  <strong>Payment Processors:</strong> PCI DSS compliant payment
                  systems
                </li>
              </ul>

              <p className="mt-4 text-amber-600 font-medium">
                Important: We do not sell personal data to third parties.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                5. Your Rights (GDPR & IT Act)
              </h2>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete personal data</li>
                <li>Right to data portability</li>
                <li>Right to restrict or object to processing</li>
              </ul>
            </div>

            {/* 6 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                6. Data Retention
              </h2>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Financial records: 7 years</li>
                <li>GST records: 6 years</li>
                <li>Client contact information: Relationship duration + 3 years</li>
                <li>Marketing data: Until consent withdrawal</li>
              </ul>
            </div>

            {/* 7 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                7. Cookies & Tracking
              </h2>

              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Essential cookies for functionality</li>
                <li>Analytics cookies for performance improvements</li>
                <li>Preference cookies for user settings</li>
              </ul>
            </div>

            {/* 8 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                8. International Data Transfers
              </h2>

              <p>
                Data may be transferred outside India where necessary. We ensure
                protection through GDPR Standard Contractual Clauses and
                compliance with Indian regulations.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                9. Contact Information
              </h2>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Data Protection Officer
                    </h4>
                    <p className="text-gray-600">JN Shah Associates</p>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <p>Email: jnshahassociates8002@gmail.com</p>
                  <p>Phone: +91 XXXXX XXXXX</p>
                  <p>Address: [Office Address]</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: March 2026 <br />
                JN Shah Associates may update this policy as regulations evolve.
              </p>
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;