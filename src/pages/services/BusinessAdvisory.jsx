import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, ArrowRight, Lightbulb, Rocket, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const BusinessAdvisory = () => {
    const services = [
        "Company & LLP Incorporation (Startup Support)",
        "Business Valuation & Financial Due Diligence",
        "Project Report Preparation & Loan Syndication",
        "Cash Flow Optimization & Budgeting advisory",
        "MSME & Trade License Registrations",
        "Business Process Restructuring",
        "Investment Structuring & Exit Planning"
    ];

    return (
        <div className="pt-40 pb-24">
            <SEO
                title="Business Advisory & Startup Mentorship"
                description="Scale your business with expert financial advisory in Vadodara. From company incorporation to loan syndication and strategic growth planning."
                keywords="Company Incorporation Vadodara, Startup Consultant Gujarat, Business Advisory India, Loan Syndication CA, MSME Registration"
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="badge-soft mb-6">Growth Vertical</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-8 leading-tight">
                            Strategic <span className="text-brand-primary">Business</span> Advisory
                        </h1>
                        <p className="text-corporate-text text-lg leading-relaxed mb-8 font-medium">
                            Starting or scaling a business involves high-stakes financial decisions. We provide the mentorship and technical data required to make those decisions with confidence, from incorporation to global expansion.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="/book" className="btn-primary">Consult for Growth</Link>
                        </div>
                    </motion.div>
                    <div className="relative">
                        <div className="bg-white p-12 rounded-[3rem] border border-brand-ice shadow-2xl relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mb-16 group-hover:scale-150 transition-transform duration-500" />
                            <TrendingUp className="w-16 h-16 text-brand-primary mb-8" />
                            <h3 className="text-2xl font-bold text-brand-navy mb-4">Scale with Confidence</h3>
                            <p className="text-corporate-text font-medium leading-relaxed">
                                We act as your external CFO, helping you manage cash flows, secure funding, and optimize your business structure for long-term scalability.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: Rocket, title: "Startup Mentorship", desc: "End-to-end support for new founders, from legal to launch." },
                        { icon: Lightbulb, title: "Strategic Insights", desc: "Data-driven advice to navigate market shifts and risks." },
                        { icon: BarChart3, title: "Financial Modeling", desc: "Robust projections for loans, investments, and planning." }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-ice/10 p-8 rounded-[2rem] border border-brand-ice/30">
                            <item.icon className="w-10 h-10 text-brand-primary mb-6" />
                            <h4 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h4>
                            <p className="text-corporate-text text-sm font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-12 rounded-[3rem] border border-brand-ice mb-24">
                    <h2 className="text-3xl font-extrabold text-brand-navy mb-10 text-center">Advisory Verticals</h2>
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
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to Take the Next Big Step?</h2>
                    <p className="text-brand-ice/80 mb-10 max-w-2xl mx-auto font-medium">Whether it's a new venture or a pivot, we have the professional expertise to guide you through the process.</p>
                    <Link to="/book" className="bg-brand-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-navy transition-all inline-flex items-center group">
                        Get Started Today <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BusinessAdvisory;
