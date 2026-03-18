import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { format, addDays, startOfToday, isSameDay, isBefore } from 'date-fns';
import { DayPicker } from 'react-day-picker';
// No default CSS import to prevent ghosting effects
import {
    Calendar as CalendarIcon, Clock, User,
    Briefcase, ArrowRight, CheckCircle2,
    ChevronRight, ChevronLeft, ShieldCheck
} from 'lucide-react';
import SEO from '../components/SEO';

const Booking = () => {
  // Initialize EmailJS with user ID from environment
  useEffect(() => {
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    if (userId) {
      emailjs.init(userId);
    }
  }, []);
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        service: null,
        date: null,
        time: null,
        name: '',
        email: '',
        phone: ''
    });

    const services = [
        { id: 'tax', name: 'Tax Consultation', desc: 'ITR planning, TDS, and personal tax advisory.', duration: '45 mins' },
        { id: 'gst', name: 'GST & Compliance', desc: 'GST filing, registration and audit queries.', duration: '60 mins' },
        { id: 'audit', name: 'Statutory Audit', desc: 'Detailed discussion on audit scope and prep.', duration: '90 mins' },
        { id: 'advisory', name: 'Business Advisory', desc: 'New startup setup or expansion strategies.', duration: '45 mins' }
    ];

    const timeSlots = [
        '10:30 AM', '11:15 AM', '12:00 PM',
        '02:30 PM', '03:15 PM', '04:00 PM',
        '04:45 PM', '05:30 PM'
    ];

    const updateData = (fields) => {
        setBookingData(prev => ({ ...prev, ...fields }));
    };

    const isStep1Valid = bookingData.service;
    const isStep2Valid = bookingData.date && bookingData.time;
    const isStep3Valid = bookingData.name && bookingData.email && bookingData.phone;

    return (
        <div className="pt-28 pb-24 min-h-screen bg-brand-bg">
            <SEO
                title="Schedule a Professional Consultation"
                description="Book a slot with CA Jay Shah or CA Nayan Shah. Professional tax and audit advisory tailored to your specific business requirements."
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stepper Header */}
                <div className="mb-16">
                    <div className="flex justify-between items-center max-w-md mx-auto relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-ice -translate-y-1/2 z-0" />
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-500"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        />
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 font-bold transition-all duration-300 ${step >= s ? 'bg-brand-navy text-white scale-110 shadow-lg' : 'bg-white text-corporate-text/40 border-2 border-brand-ice'
                                    }`}
                            >
                                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-corporate-text/40">
                                    {s === 1 ? 'Service' : s === 2 ? 'Schedule' : s === 3 ? 'Details' : 'Finish'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[3rem] border border-brand-ice shadow-3xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Sidebar Info */}
                        <div className="lg:col-span-4 bg-brand-navy p-10 text-white relative overflow-hidden">
                            <div className="relative z-10 h-full flex flex-col">
                                <h2 className="text-xl font-black mb-8 font-heading uppercase tracking-widest text-white">Consultation Details</h2>

                                <div className="space-y-8 flex-grow">
                                    {bookingData.service && (
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <Briefcase className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-brand-ice/50 mb-1">Service</div>
                                                <div className="font-bold">{services.find(s => s.id === bookingData.service)?.name}</div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {bookingData.date && (
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <CalendarIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-brand-ice/50 mb-1">Date</div>
                                                <div className="font-bold">{format(bookingData.date, 'MMMM do, yyyy')}</div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {bookingData.time && (
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start space-x-4">
                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                                <Clock className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-brand-ice/50 mb-1">Time Slot</div>
                                                <div className="font-bold">{bookingData.time}</div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex -space-x-3">
                                        {[1, 2].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-navy bg-brand-primary flex items-center justify-center font-black text-xs">
                                                {i === 1 ? 'JS' : 'NS'}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-ice/50 text-right">
                                        Expert Guidance Guaranteed
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
                        </div>

                        {/* Booking Flow Content */}
                        <div className="lg:col-span-8 p-6 sm:p-10 md:p-14">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="mb-10">
                                            <h3 className="text-3xl font-black text-brand-navy mb-4 font-heading">Select Consultation Type</h3>
                                            <p className="text-corporate-text font-medium opacity-60">Help us assign the right specialist for your specific financial needs.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {services.map((s) => (
                                                <button
                                                    key={s.id}
                                                    onClick={() => updateData({ service: s.id })}
                                                    className={`p-6 rounded-[2rem] border-2 text-left transition-all group ${bookingData.service === s.id
                                                        ? 'bg-brand-primary/5 border-brand-primary shadow-lg shadow-brand-primary/5'
                                                        : 'bg-white border-brand-ice hover:border-brand-primary/40'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${bookingData.service === s.id ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-navy group-hover:bg-brand-primary group-hover:text-white'
                                                            }`}>
                                                            <Briefcase className="w-6 h-6" />
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase text-corporate-text/40 tracking-widest">{s.duration}</span>
                                                    </div>
                                                    <h4 className="font-black text-brand-navy mb-2">{s.name}</h4>
                                                    <p className="text-xs text-corporate-text/70 leading-relaxed font-medium">{s.desc}</p>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-10 mt-4">
                                            <button
                                                onClick={() => setStep(2)}
                                                disabled={!isStep1Valid}
                                                className="btn-primary w-full sm:w-auto flex items-center justify-center space-x-3 disabled:opacity-30 disabled:grayscale"
                                            >
                                                <span>Continue to Schedule</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="mb-8">
                                            <h3 className="text-3xl font-black text-brand-navy mb-2 font-heading">Pick a Date & Time</h3>
                                            <p className="text-corporate-text font-medium opacity-60">All times are shown in IST (Vadodara).</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                            {/* Date Selection */}
                                            <div className="space-y-6">
                                                <div className="flex items-center space-x-3 text-brand-navy">
                                                    <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center font-black text-xs">1</div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-corporate-text/60">Choose your date</span>
                                                </div>
                                                <div className="calendar shadow-sm flex flex-col items-center overflow-visible">
                                                    <div className="w-full flex justify-center">
                                                        <DayPicker
                                                            mode="single"
                                                            selected={bookingData.date}
                                                            onSelect={(date) => updateData({ date })}
                                                            captionLayout="label"
                                                            startMonth={startOfToday()}
                                                            endMonth={new Date(new Date().getFullYear() + 2, 11)}
                                                            disabled={[
                                                                { dayOfWeek: [0] },
                                                                { before: startOfToday() }
                                                            ]}
                                                            classNames={{
                                                                root: "rdp-custom",
                                                                day_button: "rdp-day_button",
                                                                selected: "rdp-day_selected",
                                                                today: "rdp-day_today"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Time Selection */}
                                            <div className="space-y-6">
                                                <div className="flex items-center space-x-3 text-brand-navy">
                                                    <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center font-black text-xs">2</div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-corporate-text/60">Choose your time</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {timeSlots.map(time => (
                                                        <button
                                                            key={time}
                                                            onClick={() => updateData({ time })}
                                                            className={`py-4 rounded-xl border-2 font-bold text-xs transition-all ${bookingData.time === time
                                                                ? 'bg-brand-navy text-white border-brand-navy shadow-lg shadow-brand-navy/20 scale-[1.02]'
                                                                : 'bg-white text-brand-navy border-brand-ice hover:border-brand-primary hover:shadow-md'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="p-4 bg-brand-bg/50 rounded-xl border border-brand-ice/50 mt-4">
                                                    <div className="text-[10px] font-black uppercase text-brand-navy/40 mb-1 tracking-tighter">Location Notice</div>
                                                    <p className="text-[10px] font-bold text-brand-navy/60 leading-tight">Meetings are held via Google Meet. Link will be sent to your Vadodara office registered email.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-10 mt-4">
                                            <button onClick={() => setStep(1)} className="btn-secondary w-full sm:w-auto text-center">Back</button>
                                            <button
                                                onClick={() => setStep(3)}
                                                disabled={!isStep2Valid}
                                                className="btn-primary w-full sm:w-auto flex items-center justify-center space-x-3 disabled:opacity-30"
                                            >
                                                <span>Personal Details</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="mb-10">
                                            <h3 className="text-3xl font-black text-brand-navy mb-4 font-heading">Final Information</h3>
                                            <p className="text-corporate-text font-medium opacity-60">We'll send the meeting link and confirmation to these details.</p>
                                        </div>

                                        <div className="space-y-6 max-w-lg">
                                            <div className="relative group">
                                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-corporate-text/30 group-focus-within:text-brand-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder="Full Client Name"
                                                    value={bookingData.name}
                                                    onChange={e => updateData({ name: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 bg-brand-bg rounded-2xl border-2 border-brand-ice outline-none focus:border-brand-primary text-brand-navy font-bold transition-all"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-corporate-text/30 group-focus-within:text-brand-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder="Official Email Address"
                                                    value={bookingData.email}
                                                    onChange={e => updateData({ email: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 bg-brand-bg rounded-2xl border-2 border-brand-ice outline-none focus:border-brand-primary text-brand-navy font-bold transition-all"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <PhoneIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-corporate-text/30 group-focus-within:text-brand-primary transition-colors" />
                                                <input
                                                    type="tel"
                                                    placeholder="Mobile/WhatsApp Number"
                                                    value={bookingData.phone}
                                                    onChange={e => updateData({ phone: e.target.value })}
                                                    className="w-full pl-14 pr-6 py-5 bg-brand-bg rounded-2xl border-2 border-brand-ice outline-none focus:border-brand-primary text-brand-navy font-bold transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-10 mt-4">
                                            <button onClick={() => setStep(2)} className="btn-secondary w-full sm:w-auto text-center">Back</button>
                                            <button
                                                onClick={async () => {
            try {
              // Send admin notification
              console.log('Sending admin email...', {
                service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
                template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN
              });
              const adminRes = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
                {
                  admin_email: 'jnshahassociates8002@gmail.com',
                  client_name: bookingData.name,
                  client_email: bookingData.email,
                  client_phone: bookingData.phone,
                  service: services.find(s => s.id === bookingData.service)?.name || '',
                  date: format(bookingData.date, 'MMMM do, yyyy'),
                  time: bookingData.time,
                }
              );
              console.log('Admin email response:', adminRes);

              // Send client confirmation
              console.log('Sending client email...');
              const clientRes = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_CLIENT,
                {
                  client_name: bookingData.name,
                  client_email: bookingData.email,
                  service: services.find(s => s.id === bookingData.service)?.name || '',
                  date: format(bookingData.date, 'MMMM do, yyyy'),
                  time: bookingData.time,
                }
              );
              console.log('Client email response:', clientRes);
            } catch (error) {
              console.error('Email sending failed', error);
              alert("Failed to send confirmation email. Please check your internet or console for details.");
            }
            setStep(4);
          }}
                                                disabled={!isStep3Valid}
                                                className="btn-primary flex items-center space-x-3 disabled:opacity-30"
                                            >
                                                <span>Confirm My Slot</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10 space-y-10"
                                    >
                                        <div className="relative inline-block">
                                            <div className="w-32 h-32 bg-brand-primary/10 rounded-full flex items-center justify-center animate-pulse">
                                                <div className="w-24 h-24 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl scale-110">
                                                    <CheckCircle2 className="w-12 h-12" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-4xl font-black text-brand-navy mb-4 font-heading tracking-tight">Consultation Requested!</h3>
                                            <p className="text-corporate-text font-semibold text-lg max-w-sm mx-auto">
                                                Thank you, <span className="text-brand-primary">{bookingData.name}</span>. Our team will verify the schedule and send a calendar invite shortly.
                                            </p>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                            <button onClick={() => window.location.href = '/'} className="btn-primary">Return Home</button>
                                            <button className="flex items-center space-x-2 text-brand-navy font-black text-xs uppercase tracking-widest hover:text-brand-primary transition-colors">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span>Audit Safe Confirmation</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* FAQ / Support */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex items-start space-x-6 p-10 bg-white rounded-[2.5rem] border border-brand-ice">
                        <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center shrink-0">
                            <Clock className="w-7 h-7 text-brand-primary" />
                        </div>
                        <div>
                            <h4 className="font-black text-brand-navy mb-2">Punctuality is Core</h4>
                            <p className="text-sm text-corporate-text/70 leading-relaxed font-medium">Please join the meeting link 5 minutes before the scheduled time to ensure a smooth technical setup.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-6 p-10 bg-white rounded-[2.5rem] border border-brand-ice">
                        <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center shrink-0">
                            <User className="w-7 h-7 text-brand-primary" />
                        </div>
                        <div>
                            <h4 className="font-black text-brand-navy mb-2">Documents Ready?</h4>
                            <p className="text-sm text-corporate-text/70 leading-relaxed font-medium">Have your PAN, GST details, or relevant financial statements ready during the call for a precise analysis.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PhoneIcon = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export default Booking;
