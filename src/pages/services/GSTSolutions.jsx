import { motion } from 'framer-motion';
import { FileText, CheckCircle, ArrowRight, Shield, TrendingUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const GSTSolutions = () => {
    const services = [
        "GST Registration & Amendment Services",
        "Monthly (GSTR-1, 3B) & Quarterly Filings",
        "GST Annual Return (GSTR-9) & Reconciliation (9C)",
        "GST Refund Claims & Documentation",
        "Representation for GST Audits & Notices",
        "Input Tax Credit (ITC) Optimization & Matching",
        "GST Advisory for E-commerce & Export Units"
    ];

    return (
        <div className="pt-40 pb-24">
            <SEO
                title="GST Registration & Filing Solutions"
                description="Comprehensive GST services in Gujarat including registration, monthly filing, and audit representation. Maximize your Input Tax Credit with our experts."
                keywords="GST Registration Vadodara, GST Filing Gujarat, GSTR 9C Audit, Input Tax Credit Advisor, GST Consultant India"
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="badge-soft mb-6">Indirect Tax Vertical</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-8 leading-tight">
                            Total <span className="text-brand-primary">GST</span> Management
                        </h1>
                        <p className="text-corporate-text text-lg leading-relaxed mb-8 font-medium">
                            Navigate the complexities of Good and Services Tax with our end-to-end compliance engine. We ensure your business maintains a perfect compliance rating while maximizing Input Tax Credit.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/book" className="btn-primary">Optimize Your GST</Link>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="bg-white p-12 rounded-[3rem] border border-brand-ice shadow-2xl relative overflow-hidden group">
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
                            <FileText className="w-16 h-16 text-brand-primary mb-8" />
                            <h3 className="text-2xl font-bold text-brand-navy mb-4">Real-time Compliance</h3>
                            <p className="text-corporate-text font-medium leading-relaxed">
                                Our automated workflows ensure your GST returns are filed pinpoint accurately and ahead of the deadline, every single month.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: Search, title: "ITC Verification", desc: "Rigorous 2A/2B reconciliation to prevent credit loss." },
                        { icon: Shield, title: "Notice Response", desc: "Professional drafts and representation for GST department queries." },
                        { icon: TrendingUp, title: "Industry Specific", desc: "Custom GST frameworks for Manufacturing, Pharma, and IT." }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-ice/10 p-8 rounded-[2rem] border border-brand-ice/30">
                            <item.icon className="w-10 h-10 text-brand-primary mb-6" />
                            <h4 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h4>
                            <p className="text-corporate-text text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-12 rounded-[3rem] border border-brand-ice mb-24">
                    <h2 className="text-3xl font-extrabold text-brand-navy mb-10 text-center">GST Service Offerings</h2>
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
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Struggling with GST Reconciliations?</h2>
                    <p className="text-brand-ice/80 mb-10 max-w-2xl mx-auto font-medium">Let our specialists handle the technicalities while you focus on business growth. Perfect compliance is just a call away.</p>
                    <Link to="/book" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center group">
                        Contact GST Specialist <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GSTSolutions;
