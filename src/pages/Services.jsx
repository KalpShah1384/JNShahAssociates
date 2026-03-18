import { motion } from 'framer-motion';
import {
    Briefcase, FileText, Shield, TrendingUp, Globe,
    UserCheck, PieChart, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const serviceCategories = [
        {
            title: "Taxation Services",
            icon: Briefcase,
            slug: "tax",
            services: [
                "Income Tax Return (ITR) Filing",
                "Tax Planning & Optimization",
                "TDS & TCS Compliance",
                "Advance Tax Calculations",
                "Income Tax Assessments & Appeals"
            ]
        },
        {
            title: "Indirect Tax (GST)",
            icon: FileText,
            slug: "gst",
            services: [
                "GST Registration",
                "Monthly & Quarterly GST Returns",
                "GST Annual Return & Reconciliation",
                "GST Refunds & Representation",
                "GST Advisory for Businesses"
            ]
        },
        {
            title: "Audit & Assurance",
            icon: Shield,
            slug: "audit",
            services: [
                "Statutory Audits",
                "Tax Audits (u/s 44AB)",
                "Internal & Management Audits",
                "Stock & Revenue Audits",
                "Due Diligence"
            ]
        },
        {
            title: "Business Advisory",
            icon: TrendingUp,
            slug: "advisory",
            services: [
                "Company Incorporation (PVT/LLP)",
                "Startup Mentorship & Valuation",
                "Cash Flow Management",
                "Project Report & Loan Syndication",
                "Business Restructuring"
            ]
        },
        {
            title: "Compliance Management",
            icon: UserCheck,
            slug: "compliance",
            services: [
                "ROC Compliance & Filings",
                "FEMA & RBI Compliance",
                "PF & ESI Registrations",
                "Trade License & MSME",
                "Professional Tax Compliance"
            ]
        },
        {
            title: "International Tax",
            icon: Globe,
            slug: "international",
            services: [
                "NRIs Taxation Advisory",
                "Double Tax Avoidance (DTAA)",
                "Foreign Inward Remittance",
                "Transfer Pricing",
                "Expat Taxation"
            ]
        }
    ];

    return (
        <div className="pt-28 pb-24">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-brand-navy leading-[1.2]">Our <span className="text-brand-primary italic">Service</span> Verticals</h1>
                    <div className="w-32 h-2 bg-brand-primary mx-auto rounded-full mb-8" />
                    <p className="text-corporate-text text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium tracking-wide">
                        From strategic tax planning to operational audits, we provide a 360-degree financial ecosystem tailored for startups, SMEs, and corporate entities.
                    </p>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {serviceCategories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-brand-ice group h-full flex flex-col items-center sm:items-start text-center sm:text-left hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
                        >
                            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-10 transition-all duration-300 group-hover:bg-brand-primary">
                                <cat.icon className="w-8 h-8 text-brand-primary group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-2xl font-bold mb-8 text-brand-navy group-hover:text-brand-primary transition-colors">{cat.title}</h2>
                            <ul className="space-y-4 flex-grow mb-10 w-full">
                                {cat.services.map((service, sIdx) => (
                                    <li key={sIdx} className="flex items-center justify-center sm:justify-start text-corporate-text hover:text-brand-primary transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-brand-primary/40 mr-4 shrink-0 transition-all group-hover:bg-brand-primary" />
                                        <span className="text-sm font-bold tracking-tight">{service}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/services/${cat.slug}`} className="mt-auto flex items-center justify-center sm:justify-start text-brand-primary font-extrabold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                Explore Details <ChevronRight className="w-5 h-5 ml-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Quality Commitment Section */}
            <section className="py-32 mt-32 bg-brand-navy border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[150px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="text-white">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">Industry Specific <br /><span className="text-brand-primary">Domain Knowledge</span></h2>
                            <p className="text-brand-ice/80 mb-10 text-lg font-medium leading-relaxed">
                                We go beyond generic accounting. Our team brings specialized regulatory knowledge for niche sectors, ensuring your business stays compliant with minimal friction.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                {['IT & Software', 'Manufacturing', 'Pharma & Health', 'Real Estate', 'Global Exports', 'Non-Profits'].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3 bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-brand-primary transition-colors">
                                        <div className="w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_10px_rgba(30,86,160,0.8)]" />
                                        <span className="font-bold text-sm tracking-wide">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 shadow-3xl">
                            <div className="flex items-center space-x-6 mb-10">
                                <div className="p-4 bg-brand-primary rounded-2xl">
                                    <PieChart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Custom Solutions</h3>
                            </div>
                            <p className="text-brand-ice/70 mb-10 text-lg font-medium leading-relaxed">
                                Have a complex holding structure or cross-border tax requirements? We design custom compliance frameworks for even the most intricate business models.
                            </p>
                            <Link to="/book" className="btn-primary w-full block text-center py-5">
                                Discuss Your Project
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
