import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const phoneNumber = "917622811384"; // Updated phone number
    const message = encodeURIComponent("Hello JN Shah Associates, I would like to inquire about your professional services.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] bg-[#25D366] text-white p-3 sm:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#20ba59] transition-colors group"
        >
            <MessageCircle className="w-8 h-8" />

            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-white text-brand-navy px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-brand-ice">
                Expert Consultation
            </span>

            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
        </motion.a>
    );
};

export default WhatsAppButton;
