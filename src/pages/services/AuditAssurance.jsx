import { motion } from 'framer-motion';
import { Shield, CheckCircle, ArrowRight, FileCheck, ClipboardCheck, BarChart4 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const AuditAssurance = () => {
    const auditTypes = [
        "Statutory Audits as per Companies Act 2013",
        "Tax Audits under section 44AB of the IT Act",
        "Internal Audits for Operational Efficiency",
        "Management Audits & Due Diligence",
        "Stock & Revenue Audits",
        "GST Audits and Yearly Reconciliations",
        "Bank Audits & Certification Services"
    ];

    return (
        <div className="pt-28 pb-24">
            <SEO
                title="Statutory & Tax Audit Services"
                description="Professional auditing and assurance services in Gujarat. We specialize in Statutory Audits, Tax Audits, and Internal Audits to ensure business integrity. "
                keywords="Statutory Audit Vadodara, Tax Audit Section 44AB, Internal Audit Gujarat, CA Audit Services India, Financial Statement Assurance"
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="badge-soft mb-6">Assurance Vertical</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-8 leading-tight">
                            Robust <span className="text-brand-primary">Audit</span> & Assurance
                        </h1>
                        <p className="text-corporate-text text-lg leading-relaxed mb-8 font-medium">
                            Beyond standard compliance, our auditing process provides deep insights into your business's financial health, internal controls, and operational risks. We deliver transparency that builds trust.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/book" className="btn-primary">Schedule an Audit</Link>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="bg-white p-12 rounded-[3rem] border border-brand-ice shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                            <Shield className="w-16 h-16 text-brand-primary mb-8" />
                            <h3 className="text-2xl font-bold text-brand-navy mb-4">Independent Assurance</h3>
                            <p className="text-corporate-text font-medium leading-relaxed">
                                Our independent perspective ensures your financial statements are fair, accurate, and fully compliant with Indian Accounting Standards and ICAI norms.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: FileCheck, title: "Statutory Accuracy", desc: "Rigorous verification of company accounts and filings." },
                        { icon: ClipboardCheck, title: "Internal Controls", desc: "Evaluation of risk management and governance systems." },
                        { icon: BarChart4, title: "Data Insights", desc: "Identification of revenue leakage and cost inefficiencies." }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-ice/10 p-8 rounded-[2rem] border border-brand-ice/30">
                            <item.icon className="w-10 h-10 text-brand-primary mb-6" />
                            <h4 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h4>
                            <p className="text-corporate-text text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-12 rounded-[3rem] border border-brand-ice mb-24">
                    <h2 className="text-3xl font-extrabold text-brand-navy mb-10 text-center">Audit Specializations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {auditTypes.map((audit, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-brand-primary mt-1 shrink-0" />
                                <span className="text-corporate-text font-bold text-sm tracking-tight">{audit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-brand-navy p-12 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ensuring Integrity in Every Report</h2>
                    <p className="text-brand-ice/80 mb-10 max-w-2xl mx-auto font-medium">Build stakeholder confidence with our professional auditing services. We deliver accuracy you can rely on.</p>
                    <Link to="/book" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center group">
                        Inquire About Audit <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AuditAssurance;
