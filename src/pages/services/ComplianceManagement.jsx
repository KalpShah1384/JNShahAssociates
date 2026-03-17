import { motion } from 'framer-motion';
import { UserCheck, CheckCircle, ArrowRight, Gavel, FileSignature, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const ComplianceManagement = () => {
    const services = [
        "ROC Compliance & Annual Filings (AOC-4, MGT-7)",
        "FEMA & RBI Regulatory Reporting",
        "PF & ESI Registration & Periodic Returns",
        "Professional Tax (PT) Compliance",
        "Shop & Establishment (Gumasta) License",
        "MSME (Udyam) Registration",
        "Digital Signature (DSC) Issuance"
    ];

    return (
        <div className="pt-40 pb-24">
            <SEO
                title="ROC & Corporate Compliance Services"
                description="Hassle-free ROC filings, labor law compliance, and company secretarial services in Vadodara. Stay compliant with MCA and labor regulations. "
                keywords="ROC Filing Vadodara, Labor Law Compliance Gujarat, MSME Registration, FEMA Reporting CA, PF ESI Consultant"
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="badge-soft mb-6">Corporate Vertical</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-8 leading-tight">
                            Streamlined <span className="text-brand-primary">Compliance</span> Engine
                        </h1>
                        <p className="text-corporate-text text-lg leading-relaxed mb-8 font-medium">
                            Don't let regulatory friction slow your business down. We provide a managed compliance ecosystem that handles all your ROC, Labor, and specialized filings, ensuring you never miss a deadline.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/book" className="btn-primary">Manage My Compliance</Link>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="bg-white p-12 rounded-[3rem] border border-brand-ice shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                            <UserCheck className="w-16 h-16 text-brand-primary mb-8" />
                            <h3 className="text-2xl font-bold text-brand-navy mb-4">Worry-free Operations</h3>
                            <p className="text-corporate-text font-medium leading-relaxed">
                                We stay on top of the latest regulatory notifications, so you don't have to. Full peace of mind for your corporate governance.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: Gavel, title: "ROC Excellence", desc: "Timely filings to avoid high penalties and non-compliance status." },
                        { icon: FileSignature, title: "Labor Laws", desc: "Accurate PF, ESI, and PT management for your workforce." },
                        { icon: Settings, title: "MSME Benefits", desc: "Unlock government subsidies and benefits with proper registration." }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-ice/10 p-8 rounded-[2rem] border border-brand-ice/30">
                            <item.icon className="w-10 h-10 text-brand-primary mb-6" />
                            <h4 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h4>
                            <p className="text-corporate-text text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-12 rounded-[3rem] border border-brand-ice mb-24">
                    <h2 className="text-3xl font-extrabold text-brand-navy mb-10 text-center">Compliance Verticals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {services.map((service, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-brand-primary mt-1 shrink-0" />
                                <span className="text-corporate-text font-bold text-sm tracking-tight">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-brand-navy p-12 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Avoid Penalties & Legal Hassles</h2>
                    <p className="text-brand-ice/80 mb-10 max-w-2xl mx-auto font-medium">Compliance is becoming more digital and rigorous. Stay ahead with JN Shah Associates' managed services.</p>
                    <Link to="/book" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center group">
                        Inquire for Compliance <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ComplianceManagement;
