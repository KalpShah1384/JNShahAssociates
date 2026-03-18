import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Users, MapPin, Award, User, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="pt-28 pb-24">
            <SEO
                title="Our Legacy & Founders"
                description="Learn about the multi-generational journey of JN Shah Associates, led by CA Nayan Shah and CA Jay Shah. Committed to integrity and financial excellence since 2014."
            />
            {/* Heritage Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-brand-navy leading-[1.2]">Our <span className="text-brand-primary italic">Legacy</span> & Expertise</h1>
                        <p className="text-base md:text-lg text-corporate-text leading-relaxed mb-6 font-medium tracking-wide">
                            Founded on the principles of absolute integrity and professional excellence, JN Shah Associates is a multi-generational firm led by a dedicated father-son duo. Both <strong className="text-brand-navy font-black">CA Nayan Shah</strong> and <strong className="text-brand-navy font-black">CA Jay Shah</strong> bring combined decades of technical expertise and strategic insight to every client relationship.
                        </p>
                        <p className="text-base md:text-lg text-corporate-text leading-relaxed font-medium tracking-wide">
                            Our journey is defined by the success of our clients. From startups to established manufacturing firms, we provide the technical depth and foresight required in today's rapid business environment.
                        </p>
                    </motion.div>
                    <div className="relative md:p-16 lg:p-24">
                        <div className="bg-white border border-brand-ice rounded-[3rem] p-10 md:p-20 flex flex-col items-center justify-center shadow-2xl shadow-brand-navy/5 relative z-0 min-h-[350px] md:min-h-[450px]">
                            <div className="text-center pb-4 md:pb-24">
                                <div className="w-24 h-24 bg-brand-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-10">
                                    <Award className="w-12 h-12 text-brand-primary opacity-90" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy font-heading mb-6 tracking-tight">ICAI Registered Firm</h3>
                                <p className="text-corporate-text font-black text-xs uppercase tracking-[0.3em] opacity-60">Established & Trusted since 2014</p>
                            </div>
                        </div>

                        {/* Badge: centered below on mobile, absolute bottom-right on md+ */}
                        <div className="mt-6 mx-auto w-fit md:mt-0 md:absolute md:bottom-4 md:right-4 lg:bottom-8 lg:right-8 bg-brand-navy px-10 py-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(22,49,114,0.35)] z-10 border border-white/20 transition-all hover:-translate-y-2 hover:rotate-1 text-center">
                            <div className="text-white font-extrabold text-5xl font-heading leading-none">500+</div>
                            <div className="text-brand-ice text-[10px] font-black uppercase tracking-[0.3em] mt-4">Trusted Clients</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-navy">Meet Our <span className="text-brand-primary">Partners</span></h2>
                    <p className="text-corporate-text font-bold text-lg">Decades of technical mastery and financial foresight.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        {
                            name: "CA NAYAN SHAH",
                            title: "Senior Partner",
                            expertise: ["Audit", "Statutory Compliance", "Industrial Taxation"],
                            icon: ShieldCheck,
                            desc: "With extensive experience in ICAI standards and statutory audits, CA Nayan Shah leads the firm's assurance vertical with a focus on absolute integrity."
                        },
                        {
                            name: "CA JAY SHAH",
                            title: "Managing Partner",
                            expertise: ["GST Strategy", "Direct Tax", "Business Advisory"],
                            icon: Briefcase,
                            desc: "A specialist in digital transformation of financial services, CA Jay Shah handles high-stakes tax advisory and startup growth mentorship."
                        }
                    ].map((partner, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white rounded-[3rem] p-10 border border-brand-ice hover:border-brand-primary transition-all group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start"
                        >
                            <div className="w-32 h-32 bg-brand-bg rounded-[2.5rem] flex items-center justify-center shrink-0 border border-brand-ice group-hover:bg-brand-primary/5 transition-colors">
                                <partner.icon className="w-12 h-12 text-brand-navy/20 group-hover:text-brand-primary transition-colors" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-black text-brand-navy mb-1">{partner.name}</h3>
                                <p className="text-brand-primary font-black text-xs uppercase tracking-widest mb-4">{partner.title}</p>
                                <p className="text-corporate-text text-sm font-medium leading-relaxed mb-6 italic opacity-80">
                                    "{partner.desc}"
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    {partner.expertise.map((tag, tIdx) => (
                                        <span key={tIdx} className="bg-brand-ice/40 text-brand-navy/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-brand-ice/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-brand-ice/20 py-32 mb-32 border-y border-brand-ice/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[2rem] shadow-sm border border-brand-ice"
                        >
                            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-10">
                                <Target className="w-8 h-8 text-brand-primary" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-brand-navy">Our Mission</h2>
                            <p className="text-corporate-text text-lg leading-relaxed font-medium">
                                To provide high-quality professional services with a focus on ethical practices, technical accuracy, and client-centric solutions that foster long-term financial growth and compliance stability.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-12 rounded-[2rem] shadow-sm border border-brand-ice"
                        >
                            <div className="w-16 h-16 bg-brand-navy/10 rounded-2xl flex items-center justify-center mb-10">
                                <Eye className="w-8 h-8 text-brand-navy" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 text-brand-navy">Our Vision</h2>
                            <p className="text-corporate-text text-lg leading-relaxed font-medium">
                                To be the preferred financial architect for businesses across India, recognized for our commitment to digital transformation in professional services and our unwavering adherence to ICAI standards.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-navy">Our Core Values</h2>
                    <div className="w-24 h-1.5 bg-brand-primary mx-auto rounded-full mb-6" />
                    <p className="text-corporate-text font-bold text-lg">The foundation of everything we do at JN Shah Associates.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: ShieldCheck, title: 'Integrity', desc: 'Absolute transparency in every transaction and consultation.' },
                        { icon: Users, title: 'Client First', desc: 'Personalized attention to every unique business requirement.' },
                        { icon: Award, title: 'Excellence', desc: 'Striving for perfection in technical accuracy and compliance.' },
                        { icon: MapPin, title: 'Reliability', desc: 'Being there when you need us for critical financial decisions.' },
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-10 bg-white border border-brand-ice rounded-[2rem] hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group"
                        >
                            <div className="w-20 h-20 bg-brand-ice/30 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-primary transition-colors duration-300">
                                <value.icon className="w-10 h-10 text-brand-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-brand-navy">{value.title}</h3>
                            <p className="text-corporate-text text-sm font-medium leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Corporate Info Footer */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-brand-navy p-16 rounded-[2.5rem] text-center shadow-2xl border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <div>
                            <div className="text-brand-primary text-xs uppercase tracking-widest mb-3 font-extrabold">Office HQ</div>
                            <a href="https://maps.app.goo.gl/CCpQ6c2gicTbUTrKA" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-brand-primary transition-colors">Vadodara, HQ</a>
                        </div>
                        <div>
                            <div className="text-brand-primary text-xs uppercase tracking-widest mb-3 font-extrabold">Accreditation</div>
                            <div className="text-xl font-bold text-white px-4">Chartered Accountants (ICAI)</div>
                        </div>
                        <div>
                            <div className="text-brand-primary text-xs uppercase tracking-widest mb-3 font-extrabold">Specialization</div>
                            <div className="text-2xl font-bold text-white">Tax & Audit</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
