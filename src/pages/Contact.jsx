import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Plus, Minus, HelpCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ReCaptcha from '../components/ReCaptcha';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [recaptchaReset, setRecaptchaReset] = useState(0);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRecaptchaVerify = (token) => {
        setRecaptchaToken(token);
        setSubmitStatus('');
    };

    const handleRecaptchaExpire = () => {
        setRecaptchaToken('');
        setSubmitStatus('reCAPTCHA expired. Please try again.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!recaptchaToken) {
            setSubmitStatus('Please complete the reCAPTCHA verification.');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Here you would normally send the form data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setSubmitStatus('success');
            setFormData({ name: '', phone: '', email: '', service: '', message: '' });
            setRecaptchaReset(prev => prev + 1); // Reset reCAPTCHA
            setRecaptchaToken('');
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="pt-40 pb-24">
            <SEO
                title="Book a Free Consultation"
                description="Contact JN Shah Associates today for professional CA services in Vadodara. Schedule your free consultation for tax filing, GST registration, or business advisory."
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 text-brand-navy">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Let's <span className="text-brand-primary underline decoration-brand-ice underline-offset-[12px]">Connect</span></h1>
                        <p className="text-corporate-text text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                            Need expert guidance on taxation or business compliance? Our specialized team is here to assist you with tailored financial strategies.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <h2 className="text-2xl font-extrabold text-brand-navy border-b-4 border-brand-ice pb-4 inline-block">Contact Info</h2>

                        <div className="flex items-start space-x-6 group p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300">
                            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-primary transition-colors duration-300">
                                <Phone className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-brand-navy mb-1">Call Us</h3>
                                <p className="text-corporate-text font-bold text-lg">+91 76228 11384</p>
                                <p className="text-brand-primary/60 text-xs font-black uppercase tracking-widest mt-1">Mon-Fri: 10:00 AM - 6:30 PM</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-6 group p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300">
                            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-primary transition-colors duration-300">
                                <Mail className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-brand-navy mb-1">Email Us</h3>
                                <a href="mailto:jnshahassociates8002@gmail.com" className="text-corporate-text font-bold text-lg hover:text-brand-primary transition-colors">jnshahassociates8002@gmail.com</a>
                                <p className="text-brand-primary/60 text-xs font-black uppercase tracking-widest mt-1">Support response in 24h</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-6 group p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-brand-navy/5 transition-all duration-300">
                            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-primary transition-colors duration-300">
                                <MapPin className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-brand-navy mb-1">Visit Office</h3>
                                <a href="https://maps.app.goo.gl/CCpQ6c2gicTbUTrKA" target="_blank" rel="noopener noreferrer" className="text-corporate-text font-bold leading-relaxed hover:text-brand-primary transition-colors">
                                    8th Floor, Sandesh Bhavan, Near Vuda Circle (L & T Circle), Karelibaug Vadodara - 390008, Gujarat, India
                                </a>
                            </div>
                        </div>

                        <div className="p-10 bg-brand-navy border border-white/5 rounded-[2.5rem] mt-12 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-brand-primary/10 transition-colors" />
                            <div className="relative z-10">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-brand-primary rounded-xl">
                                        <MessageSquare className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-extrabold text-xl text-white">Instant Chat</h3>
                                </div>
                                <p className="text-brand-ice/70 text-sm font-medium mb-8 leading-relaxed">Quick queries? Get immediate guidance from our tax experts via WhatsApp.</p>
                                <a href="https://wa.me/917622811384" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-navy block text-center py-4 rounded-xl font-bold hover:bg-brand-ice transition-all shadow-lg active:scale-95">
                                    Start WhatsApp Chat
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-brand-ice shadow-3xl shadow-brand-navy/5">
                            <h2 className="text-3xl font-extrabold mb-10 text-brand-navy underline underline-offset-[10px] decoration-brand-ice">Inquiry Form</h2>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-brand-navy uppercase tracking-widest">Full Name</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Rahul Sharma"
                                            required
                                            className="w-full bg-brand-bg border border-brand-ice rounded-2xl px-6 py-4 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 focus:outline-none transition-all text-brand-navy font-bold placeholder:text-slate-400"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-brand-navy uppercase tracking-widest">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            type="tel"
                                            placeholder="+91 00000 00000"
                                            required
                                            className="w-full bg-brand-bg border border-brand-ice rounded-2xl px-6 py-4 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 focus:outline-none transition-all text-brand-navy font-bold placeholder:text-slate-400"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-brand-navy uppercase tracking-widest">Email Address</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        placeholder="rahul@example.com"
                                        required
                                        className="w-full bg-brand-bg border border-brand-ice rounded-2xl px-6 py-4 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 focus:outline-none transition-all text-brand-navy font-bold placeholder:text-slate-400"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-brand-navy uppercase tracking-widest">Service Vertical</label>
                                    <select 
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-brand-bg border border-brand-ice rounded-2xl px-6 py-4 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 focus:outline-none transition-all text-brand-navy font-bold appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a Service</option>
                                        <option value="Direct Tax Advisory">Direct Tax Advisory</option>
                                        <option value="GST Solutions">GST Solutions</option>
                                        <option value="Audit & Assurance">Audit & Assurance</option>
                                        <option value="Business Advisory">Business Advisory</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black text-brand-navy uppercase tracking-widest">Detailed Inquiry</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="5"
                                        placeholder="Briefly describe your requirements..."
                                        className="w-full bg-brand-bg border border-brand-ice rounded-2xl px-6 py-4 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 focus:outline-none transition-all text-brand-navy font-bold placeholder:text-slate-400"
                                    ></textarea>
                                </div>

                                <ReCaptcha 
                                    onVerify={handleRecaptchaVerify} 
                                    onExpire={handleRecaptchaExpire}
                                    resetKey={recaptchaReset}
                                />

                                {submitStatus && (
                                    <div className={`p-4 rounded-2xl flex items-center space-x-3 ${
                                        submitStatus === 'success' ? 'bg-green-50 text-green-700' : 
                                        submitStatus === 'error' ? 'bg-red-50 text-red-700' : 
                                        'bg-yellow-50 text-yellow-700'
                                    }`}>
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="font-medium">
                                            {submitStatus === 'success' ? 'Thank you! Your inquiry has been submitted successfully. We will contact you within 24 hours.' :
                                             submitStatus === 'error' ? 'Something went wrong. Please try again later.' :
                                             submitStatus}
                                        </span>
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || !recaptchaToken}
                                    className="btn-primary w-full py-6 flex items-center justify-center space-x-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-6 h-6" />
                                            <span>Submit Inquiry</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-corporate-text/50 text-xs font-bold mt-6 tracking-wide">
                                    PRIVACY NOTE: Your data is secure and will only be used for professional communication.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <a href="https://maps.app.goo.gl/CCpQ6c2gicTbUTrKA" target="_blank" rel="noopener noreferrer" className="block h-[28rem] w-full bg-white border-4 border-dashed border-brand-ice rounded-[3rem] overflow-hidden flex items-center justify-center shadow-inner group hover:bg-brand-ice/10 transition-colors">
                    <div className="text-center group-hover:scale-105 transition-transform duration-300">
                        <MapPin className="w-16 h-16 text-brand-primary mx-auto mb-6 opacity-40 group-hover:opacity-100 transition-all duration-300" />
                        <h3 className="text-2xl font-extrabold text-brand-navy">View on Google Maps</h3>
                        <p className="text-corporate-text font-bold italic mt-2">8th Floor, Sandesh Bhavan, Vadodara</p>
                    </div>
                </a>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-brand-navy font-heading">Common <span className="text-brand-primary">Questions</span></h2>
                    <p className="text-corporate-text font-medium mt-4">Quick answers to frequently asked compliance queries.</p>
                </div>

                <div className="space-y-4">
                    {[
                        { q: "What documents are required for GST Registration?", a: "For a proprietorship, you typically need PAN, Aadhaar, a photograph of the owner, proof of business address (Electricity bill/Rent agreement), and a cancelled cheque/bank statement." },
                        { q: "How long does the company incorporation process take?", a: "With all documents in place, the MCA approval process usually takes 7-10 working days, including the reservation of the name and issuance of the Certificate of Incorporation (CoI)." },
                        { q: "Do you provide online consultation for NRIs?", a: "Yes, we have a dedicated international tax desk. We facilitate consultations via Google Meet or Zoom to assist NRIs with property taxation, DTAA benefits, and 15CA/15CB certifications." },
                        { q: "Can I manage my documents digitally with your firm?", a: "Absolutely. Our registered clients get access to a 'Secure Vault' where they can upload documents, track filing status, and download tax returns anytime." }
                    ].map((item, i) => (
                        <FAQItem key={i} question={item.q} answer={item.a} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-brand-ice rounded-[2rem] bg-white overflow-hidden shadow-sm transition-all hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-8 text-left flex justify-between items-center group"
            >
                <span className="text-lg font-bold text-brand-navy group-hover:text-brand-primary transition-colors">{question}</span>
                <div className={`w-8 h-8 rounded-full border-2 border-brand-ice flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-brand-navy border-brand-navy text-white rotate-180' : ''}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-8 pb-8 text-corporate-text font-medium leading-relaxed border-t border-brand-ice pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contact;
