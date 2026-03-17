import { motion } from 'framer-motion';

const Disclaimer = () => {
    return (
        <div className="bg-slate-950 pt-32 pb-24">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-12 rounded-3xl border-primary-500/20"
                >
                    <h1 className="text-3xl font-bold mb-8 text-white">ICAI Disclaimer</h1>
                    <div className="space-y-6 text-slate-400 leading-relaxed">
                        <p>
                            The patterns and guidance provided by the Institute of Chartered Accountants of India (ICAI) strictly prohibit any form of advertisement or solicitation by Chartered Accountants.
                        </p>
                        <p>
                            By clicking "Enter" or accessing this website, the user acknowledges that:
                        </p>
                        <ul className="list-disc pl-6 space-y-4">
                            <li>The user wishes to gain more information about **JN Shah Associates** for their own information and use.</li>
                            <li>There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from the firm or any of its partners to solicit any work through this website.</li>
                            <li>The information provided in the website is for informational purposes only and does not constitute professional advice or a formal representation of the firm.</li>
                            <li>The firm is not liable for any action taken by the user relying on the material/information provided on this website.</li>
                        </ul>
                        <p className="pt-6 border-t border-white/5 font-semibold text-slate-300">
                            This website is intended to be compliant with the guidelines issued by ICAI regarding professional ethics and digital presence.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Disclaimer;
