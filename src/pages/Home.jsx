import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Clock, CheckCircle, ChevronRight, Calculator, FileText, Briefcase, Bell, Factory, Monitor, Stethoscope, Globe, ShoppingBag, Building, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNews = async () => {
        try {
            const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;

            // Primary targeted query
            const primaryQuery = 'ICAI OR "Income Tax" OR "GST India" OR "Taxation"';
            let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(primaryQuery)}&language=en&country=in`;

            let response = await fetch(url);
            let data = await response.json();

            // Fallback: If 0 results (common with 48h restriction), try broader finance query
            if (data.status === 'success' && (!data.results || data.results.length === 0)) {
                console.log("No specific CA news in 48h, trying broader finance query...");
                const fallbackQuery = 'finance india OR "business news" OR "economy india"';
                url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(fallbackQuery)}&language=en&country=in`;
                response = await fetch(url);
                data = await response.json();
            }

            if (data.status === 'success' && data.results) {
                // Professional relevance filter
                const filtered = data.results.filter(article => {
                    const text = (article.title + (article.description || '')).toLowerCase();
                    const keywords = ['tax', 'gst', 'finance', 'audit', 'compliance', 'budget', 'economy', 'business', 'mca', 'icai', 'rbi'];
                    return keywords.some(key => text.includes(key));
                });

                setNews(filtered.length > 0 ? filtered.slice(0, 3) : data.results.slice(0, 3));
            }
        } catch (error) {
            console.error('Error fetching home news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="overflow-hidden">
            <SEO
                title="JN Shah Associates | Chartered Accountants in Vadodara"
                description="Expert CA services in Vadodara, Gujarat. Specializing in Direct Tax, GST, Audit, and Business Advisory with a legacy of multi-generational expertise."
                keywords="Chartered Accountant Vadodara, CA firm Gujarat, JN Shah Associates, Nayan Shah, Jay Shah, GST Registration Vadodara, Audit services India"
            />
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-32 pb-24 md:pt-40 md:pb-32">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-primary/10 rounded-full blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-20 left-0 w-48 h-48 md:w-72 md:h-72 bg-brand-ice/50 rounded-full blur-[70px] md:blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="badge-soft mb-6 inline-block">
                                ICAI Compliant Chartered Accountancy Firm
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-[1.15] text-brand-navy tracking-tight font-heading">
                                Empowering Your Financial <span className="text-brand-primary italic">Excellence</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-corporate-text/90 mb-8 md:mb-12 leading-relaxed max-w-2xl font-medium tracking-wide">
                                JN Shah Associates provides comprehensive taxation, audit, and business advisory services. We transform complex financial regulations into clear, actionable strategies for your growth.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/book" className="btn-primary w-full sm:w-auto text-center px-8">
                                    Book Free Consultation
                                </Link>
                                <Link to="/services" className="btn-secondary w-full sm:w-auto text-center px-8">
                                    Explore Services
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Snapshot */}
            <section className="py-20 md:py-24 bg-brand-ice/20 border-y border-brand-ice/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Core Service Excellence</h2>
                        <p className="text-sm sm:text-base text-corporate-text max-w-2xl mx-auto font-medium">Providing a specialized suite of services tailored to meet the dynamic needs of modern businesses.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { icon: Briefcase, title: 'Direct Tax', desc: 'Expert income tax planning, filing, and representation services.', slug: 'tax' },
                            { icon: FileText, title: 'GST Solutions', desc: 'End-to-end GST compliance, audit, and strategic advisory.', slug: 'gst' },
                            { icon: Shield, title: 'Audit & Assurance', desc: 'Robust auditing services ensuring transparency and compliance.', slug: 'audit' },
                            { icon: TrendingUp, title: 'Business Advisory', desc: 'Strategic consulting to optimize your business operations.', slug: 'advisory' },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card-premium h-full flex flex-col items-center sm:items-start text-center sm:text-left group p-6 sm:p-8"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors duration-300">
                                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-brand-primary group-hover:text-white" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-3 text-brand-navy">{service.title}</h3>
                                <p className="text-xs sm:text-sm text-corporate-text leading-relaxed mb-6 flex-grow font-medium">{service.desc}</p>
                                <Link to={`/services/${service.slug}`} className="text-brand-primary flex items-center text-xs sm:text-sm font-bold group-hover:translate-x-1 transition-transform">
                                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statutory Updates Feed */}
            <section className="py-20 md:py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center space-x-3 text-brand-primary mb-4">
                            <Bell className="w-5 h-5 animate-bounce" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Regulatory Radar</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-brand-navy font-heading">Latest <span className="text-brand-primary">Updates</span></h2>
                    </div>
                    <Link to="/knowledge-hub" className="text-brand-navy font-black text-[10px] md:text-xs uppercase tracking-widest border-b-2 border-brand-primary pb-1 hover:text-brand-primary transition-colors">View Knowledge Hub</Link>
                </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="p-6 md:p-8 bg-brand-bg/40 rounded-[2rem] md:rounded-[2.5rem] border border-brand-ice animate-pulse h-64">
                                    <div className="flex justify-between mb-6">
                                        <div className="w-20 h-3 bg-brand-navy/10 rounded" />
                                        <div className="w-16 h-3 bg-brand-navy/10 rounded" />
                                    </div>
                                    <div className="w-full h-6 bg-brand-navy/10 rounded mb-4" />
                                    <div className="w-3/4 h-4 bg-brand-navy/10 rounded" />
                                </div>
                            ))
                        ) : news.length > 0 ? (
                            news.map((update, idx) => (
                                <div key={idx} className="p-6 md:p-8 bg-brand-bg/40 rounded-[2rem] md:rounded-[2.5rem] border border-brand-ice hover:bg-white hover:shadow-2xl hover:shadow-brand-navy/5 transition-all group flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-[10px] font-black text-brand-navy/40 uppercase tracking-widest">
                                            {new Date(update.pubDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                        </span>
                                        <span className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">Update</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-black text-brand-navy mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                                        {update.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-corporate-text/70 leading-relaxed font-medium line-clamp-3 mb-6 flex-grow">
                                        {update.description || 'Statutory regulatory update for businesses and professionals.'}
                                    </p>
                                    <a
                                        href={update.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:gap-2.5 transition-all"
                                    >
                                        Full Article <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-brand-navy font-bold uppercase tracking-widest text-xs opacity-40">Connecting to ICAI updates...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Sectors We Serve */}
            <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-brand-primary/10 rounded-full blur-[80px] md:blur-[120px] -mr-32 -mt-32 md:-mr-64 md:-mt-64" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 font-heading">Sectors We <span className="text-brand-primary italic">Serve</span></h2>
                        <p className="text-sm sm:text-base text-brand-ice/60 max-w-2xl mx-auto font-medium">Domain expertise tailored for specialized industrial requirements.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {[
                            { icon: Factory, name: 'Manufacturing' },
                            { icon: Monitor, name: 'IT & SaaS' },
                            { icon: Stethoscope, name: 'Healthcare' },
                            { icon: Globe, name: 'NRI / Global' },
                            { icon: ShoppingBag, name: 'Retail' },
                            { icon: Building, name: 'Real Estate' }
                        ].map((sector, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] text-center hover:bg-brand-primary transition-all group cursor-default"
                            >
                                <sector.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-primary mx-auto mb-6 group-hover:text-white transition-colors" />
                                <h4 className="text-white font-black text-[9px] md:text-[11px] uppercase tracking-widest">{sector.name}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 md:py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-brand-navy">Why Businesses Trust <span className="text-brand-primary">JN Shah Associates</span></h2>
                            <p className="text-base sm:text-lg text-corporate-text mb-8 md:mb-12 flex items-start font-medium">
                                Our firm is built on the pillars of integrity, expertise, and commitment. We don't just provide services; we build long-term partnerships for financial success.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Technical Expertise', desc: 'Years of deep domain experience in tax laws and audit standards.' },
                                    { title: 'Timely Compliance', desc: 'Rigorous systems to ensure all your deadlines are met perfectly.' },
                                    { title: 'Confidentiality', desc: 'Utmost security and privacy of your sensitive financial data.' },
                                    { title: 'Industry Specific Focus', desc: 'Customized solutions for Startups, IT, Manufacturing, and SMEs.' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="mt-1 shrink-0">
                                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-brand-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-base md:text-lg font-bold text-brand-navy">{item.title}</h4>
                                            <p className="text-xs md:text-sm text-corporate-text font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative mt-8 lg:mt-0">
                            <div className="bg-brand-ice/20 border border-brand-ice rounded-3xl aspect-square flex items-center justify-center relative max-w-lg mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent rounded-3xl" />
                                <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10 w-full px-4 md:px-8">
                                    <div className="bg-white p-4 md:p-6 rounded-2xl text-center shadow-sm border border-brand-ice/50">
                                        <Clock className="w-8 h-8 md:w-10 md:h-10 text-brand-primary mx-auto mb-4" />
                                        <div className="text-2xl md:text-3xl font-bold text-brand-navy">10+</div>
                                        <div className="text-corporate-text text-[9px] md:text-xs font-bold uppercase tracking-wider">Years of Exp.</div>
                                    </div>
                                    <div className="bg-white p-4 md:p-6 rounded-2xl text-center shadow-sm border border-brand-ice/50">
                                        <Calculator className="w-8 h-8 md:w-10 md:h-10 text-brand-primary mx-auto mb-4" />
                                        <div className="text-2xl md:text-3xl font-bold text-brand-navy">500+</div>
                                        <div className="text-corporate-text text-[9px] md:text-xs font-bold uppercase tracking-wider">Returns Filed</div>
                                    </div>
                                    <div className="bg-white col-span-2 p-4 md:p-6 rounded-2xl text-center shadow-sm border border-brand-ice/50">
                                        <Shield className="w-8 h-8 md:w-10 md:h-10 text-brand-primary mx-auto mb-4" />
                                        <div className="text-2xl md:text-3xl font-bold text-brand-navy">100%</div>
                                        <div className="text-corporate-text text-[9px] md:text-xs font-bold uppercase tracking-wider">ICAI Compliance</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-brand-navy rounded-[2rem] md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-brand-navy/20">
                        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-brand-primary/10 rounded-full blur-3xl -ml-12 md:-ml-20 -mt-12 md:-mt-20" />
                        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -mr-12 md:-mr-20 -mb-12 md:-mb-20" />

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">Ready for Financial Growth?</h2>
                        <p className="text-base md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-medium">Schedule a free consultation today and let our experts guide your business towards total compliance and fiscal efficiency.</p>
                        <Link to="/book" className="bg-white text-brand-navy px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-brand-ice transition-all shadow-xl active:scale-95 inline-block">
                            Schedule Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
