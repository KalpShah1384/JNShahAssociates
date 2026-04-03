import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, ArrowRight, Shield, FileText, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const DirectTax = () => {
    const features = [
        "Income Tax Return (ITR) Filing for Individuals, Firms, and Companies",
        "Tax Planning & Optimization Strategies",
        "TDS & TCS Compliance & Periodic Filings",
        "Advance Tax Calculations & Management",
        "Representation for Income Tax Assessments & Appeals",
        "Tax Audit u/s 44AB of Income Tax Act",
        "Capital Gains Advisory & Structuring"
    ];

    return (
        <div className="pt-28 pb-24">
            <SEO
                title="Direct Tax Advisory & ITR Filing"
                description="Expert income tax planning, ITR filing, and audit services in Vadodara. Strategic advice for individuals and corporations under the Income Tax Act."
                keywords="Income Tax Filing Vadodara, ITR Filing Gujarat, Tax Audit 44AB, Tax Planning India, TDS Compliance"
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="badge-soft mb-6">Taxation Vertical</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-8 leading-tight">
                            Strategic <span className="text-brand-primary">Direct Tax</span> Advisory
                        </h1>
                        <p className="text-corporate-text text-lg leading-relaxed mb-8 font-medium">
                            In an ever-evolving tax landscape, <span style={{ fontFamily: "var(--font-trajan)" }} className="font-bold text-brand-navy">JN Shah Associates</span> provides comprehensive direct taxation services designed to minimize liabilities and ensure total compliance with the Income Tax Act.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/book" className="btn-primary">Get Expert Advice</Link>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="bg-white p-12 rounded-[3rem] border border-brand-ice shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                            <Briefcase className="w-16 h-16 text-brand-primary mb-8" />
                            <h3 className="text-2xl font-bold text-brand-navy mb-4">Precision Compliance</h3>
                            <p className="text-corporate-text font-medium leading-relaxed">
                                We handle complex tax filings, assessments, and planning with technical accuracy and strategic foresight.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: Shield, title: "Compliance First", desc: "Rigorous adherence to latest tax laws and regulations." },
                        { icon: FileText, title: "Clear Reporting", desc: "Detailed transparency in all your tax computations." },
                        { icon: PieChart, title: "Wealth Growth", desc: "Strategic planning to optimize your post-tax returns." }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-ice/10 p-8 rounded-[2rem] border border-brand-ice/30">
                            <item.icon className="w-10 h-10 text-brand-primary mb-6" />
                            <h4 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h4>
                            <p className="text-corporate-text text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-12 rounded-[3rem] border border-brand-ice mb-24">
                    <h2 className="text-3xl font-extrabold text-brand-navy mb-10 text-center">Comprehensive Service Spectrum</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-brand-primary mt-1 shrink-0" />
                                <span className="text-corporate-text font-bold text-sm tracking-tight">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-brand-navy p-12 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Need Professional Tax Guidance?</h2>
                    <p className="text-brand-ice/80 mb-10 max-w-2xl mx-auto font-medium">Protect your business from litigation and optimize your tax outflows with our expert consultation.</p>
                    <Link to="/book" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center group">
                        Book a Consultation <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default DirectTax;
