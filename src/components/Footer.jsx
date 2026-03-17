import { Rocket, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/CA_logo.png';

const Footer = () => {
    return (
        <footer className="bg-brand-navy pt-24 pb-12 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -mr-64 -mb-64" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <img src={Logo} alt="JN Shah Associates Logo" className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                            <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl md:text-3xl font-bold text-white tracking-normal">
                                JN<span className="text-brand-primary italic ml-1">Shah Associates</span>
                            </span>
                        </Link>
                        <p className="text-brand-ice/60 leading-relaxed font-bold text-sm tracking-wide">
                            Enterprise-grade CA firm delivering precise taxation, robust audits, and strategic advisory. Committed to financial integrity and ICAI compliance excellence.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Linkedin, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Facebook, href: "#" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all text-brand-ice/80 hover:text-white border border-white/5">
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Hub */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-10 border-b border-white/10 pb-4 inline-block">Navigation Hub</h3>
                        <ul className="grid grid-cols-1 gap-4 text-brand-ice/70 font-bold text-sm">
                            {['Home', 'About Firm', 'Service Verticals', 'Schedule Meeting'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item === 'Home' ? '' : item.toLowerCase().split(' ')[0]}`} className="hover:text-brand-primary transition-colors flex items-center group">
                                        <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Regulatory Portals */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-10 border-b border-white/10 pb-4 inline-block">Regulatory Portals</h3>
                        <ul className="space-y-4 text-brand-ice/70 font-bold text-sm">
                            {[
                                { name: 'Income Tax e-Filing', url: 'https://www.incometax.gov.in/' },
                                { name: 'GST Common Portal', url: 'https://www.gst.gov.in/' },
                                { name: 'MCA Services V3', url: 'https://www.mca.gov.in/' },
                                { name: 'ICAI Self Service', url: 'https://eservices.icai.org/' }
                            ].map((link, i) => (
                                <li key={i}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-brand-primary transition-colors group">
                                        {link.name} <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-10 border-b border-white/10 pb-4 inline-block">Office HQ</h3>
                        <ul className="space-y-6 text-brand-ice/70 font-bold text-sm">
                            <li className="flex items-start space-x-4">
                                <MapPin className="w-5 h-5 text-brand-primary mt-1 shrink-0" />
                                <a href="https://maps.app.goo.gl/CCpQ6c2gicTbUTrKA" target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-brand-primary transition-colors">
                                    8th Floor, Sandesh Bhavan, Near Vuda Circle (L & T Circle), Karelibaug,<br />Vadodara - 390008, Gujarat, India
                                </a>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                                <span className="tracking-widest">+91 76228 11384</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                                <a href="mailto:jnshahassociates8002@gmail.com" className="underline underline-offset-4 decoration-brand-primary/30 text-xs hover:text-brand-primary transition-colors">jnshahassociates8002@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-brand-ice/40 text-[11px] font-black uppercase tracking-widest">
                    <p>© 2026 JN SHAH ASSOCIATES. ALL RIGHTS RESERVED. DESIGNED FOR PERFORMANCE.</p>
                    <div className="flex space-x-10 mt-6 md:mt-0">
                        <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Charter</Link>
                        <Link to="/disclaimer" className="hover:text-brand-primary transition-colors">ICAI Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
