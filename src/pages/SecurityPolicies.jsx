import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  AlertTriangle,
  Users,
  Server,
  FileCheck,
  Eye,
  Clock,
  Phone,
} from "lucide-react";
import SEO from "../components/SEO";

const SecurityPolicies = () => {
  return (
    <div className="bg-gray-50 pt-28 pb-24">
      <SEO
        title="Security Policies"
        description="Detailed information security, encryption, access control, and incident response policies followed by JN Shah Associates to protect client data."
      />
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
              Security Policies & Data Protection
            </h1>
          </div>

          {/* Executive Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <FileCheck className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-blue-900">
                Our Security Commitment
              </h2>
            </div>
            <p className="text-blue-800">
              At <span style={{ fontFamily: "var(--font-trajan)" }} className="font-bold text-brand-navy">JN Shah Associates</span>, data security is fundamental to our
              practice. We are committed to maintaining the highest standards of
              information security, protecting client data, and ensuring
              compliance with international and Indian security regulations.
              This policy outlines our comprehensive security framework.
            </p>
          </div>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            {/* 1. Data Encryption */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-blue-500" />
                <span>1. Data Encryption Standards</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    At Rest Encryption
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• AES-256 encryption for all stored data</li>
                    <li>• Database-level encryption</li>
                    <li>• Encrypted file storage systems</li>
                    <li>• Secure key management</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    In Transit Encryption
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• TLS 1.3 for all data transmission</li>
                    <li>• End-to-end encryption for client communications</li>
                    <li>• Secure VPN for remote access</li>
                    <li>• Encrypted email systems</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Access Control */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>2. Access Control & Authentication</span>
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Multi-Factor Authentication (MFA)
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    All staff members and systems require MFA for access to
                    client data and sensitive systems.
                  </p>
                  <ul className="text-sm space-y-1 text-gray-600 ml-4">
                    <li>• Hardware security keys preferred</li>
                    <li>• Authenticator apps as secondary option</li>
                    <li>• SMS-based MFA for emergency access</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Role-Based Access Control (RBAC)
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Access to data and systems is strictly limited to authorized
                    personnel based on job requirements.
                  </p>
                  <ul className="text-sm space-y-1 text-gray-600 ml-4">
                    <li>• Principle of least privilege</li>
                    <li>• Regular access reviews and audits</li>
                    <li>• Automatic access revocation upon role change</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Network Security */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Server className="w-5 h-5 text-blue-500" />
                <span>3. Network & Infrastructure Security</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Firewall & Intrusion Detection
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Next-generation firewalls</li>
                    <li>• Intrusion detection/prevention systems</li>
                    <li>• DDoS protection</li>
                    <li>• Real-time threat monitoring</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Regular Security Updates
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Automated patch management</li>
                    <li>• Vulnerability scanning weekly</li>
                    <li>• Penetration testing quarterly</li>
                    <li>• Security updates within 24 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. Incident Response */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-blue-500" />
                <span>4. Incident Response & Breach Notification</span>
              </h2>

              <div className="space-y-4">
                <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">
                    Breach Response Timeline
                  </h4>
                  <div className="space-y-2 text-sm text-red-800">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        <strong>Immediate (0-1 hour):</strong> Incident
                        detection and containment
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        <strong>Within 24 hours:</strong> Internal investigation
                        and assessment
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        <strong>Within 72 hours:</strong> Notification to
                        affected parties (GDPR compliance)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Response Team
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Our incident response team includes certified security
                    professionals and legal counsel.
                  </p>
                  <ul className="text-sm space-y-1 text-gray-600 ml-4">
                    <li>• 24/7 security monitoring team</li>
                    <li>• Designated incident response coordinator</li>
                    <li>• External cybersecurity consultants on retainer</li>
                    <li>• Legal counsel for compliance matters</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Physical Security */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-500" />
                <span>5. Physical Security Measures</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Office Security
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• 24/7 access control systems</li>
                    <li>• CCTV surveillance</li>
                    <li>• Secure document storage</li>
                    <li>• Visitor management system</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Device Security
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Full disk encryption on all devices</li>
                    <li>• Remote wipe capability</li>
                    <li>• Screen lock policies</li>
                    <li>• Secure disposal of old equipment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Employee Security Training */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>6. Employee Security Training</span>
              </h2>

              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 mb-4">
                  All employees undergo comprehensive security training as part
                  of our commitment to data protection.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900">
                      Annual Training
                    </div>
                    <div className="text-sm text-blue-700">
                      Mandatory security awareness
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900">
                      Phishing Tests
                    </div>
                    <div className="text-sm text-blue-700">
                      Quarterly simulation exercises
                    </div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900">
                      New Hire Onboarding
                    </div>
                    <div className="text-sm text-blue-700">
                      Security training within first week
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. Certifications & Compliance */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-blue-500" />
                <span>7. Certifications & Compliance Standards</span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    SOC 2 Type II
                  </div>
                  <div className="text-sm text-gray-600">
                    Trust service criteria compliance
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">ISO 27001</div>
                  <div className="text-sm text-gray-600">
                    Information security management
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">GDPR</div>
                  <div className="text-sm text-gray-600">
                    European data protection
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">IT Act 2000</div>
                  <div className="text-sm text-gray-600">
                    Indian cybersecurity law
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">PCI DSS</div>
                  <div className="text-sm text-gray-600">
                    Payment card security
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="font-semibold text-gray-900">
                    ICAI Standards
                  </div>
                  <div className="text-sm text-gray-600">
                    Professional accounting ethics
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Third-Party Risk Management */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                8. Third-Party Risk Management
              </h2>

              <p className="text-gray-700 mb-4">
                We carefully evaluate and monitor all third-party service
                providers to ensure they meet our security standards.
              </p>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Vendor Assessment Process
                </h4>
                <ul className="text-sm space-y-1 text-gray-600 ml-4">
                  <li>• Security questionnaire completion</li>
                  <li>• Background checks for critical vendors</li>
                  <li>• Contractual security requirements</li>
                  <li>• Regular security audits of vendors</li>
                  <li>• Right to audit clause in all contracts</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>9. Security Contact & Reporting</span>
              </h2>

              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Chief Information Security Officer
                    </h4>
                    <p className="text-gray-600 font-bold" style={{ fontFamily: "var(--font-trajan)" }}>JN Shah Associates</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Security Incidents:</strong>{" "}
                    jnshahassociates8002@gmail.com
                  </p>
                  <p>
                    <strong>Emergency Hotline:</strong> +91 XXXXX XXXXX (24/7)
                  </p>
                  <p>
                    <strong>Response Time:</strong> Critical incidents within 1
                    hour
                  </p>
                  <p>
                    <strong>Anonymous Reporting:</strong> Available for internal
                    security concerns
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <strong>Last updated:</strong> March 2026
                <br />
                <strong>Next security audit:</strong> June 2026
                <br />
                This policy is reviewed annually and updated as needed to
                address emerging threats and regulatory changes.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SecurityPolicies;
