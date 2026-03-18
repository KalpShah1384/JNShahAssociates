import { motion } from 'framer-motion';

const Disclaimer = () => {
    return (
        <div className="bg-brand-bg pt-28 pb-24">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-brand-ice shadow-xl"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-brand-navy font-heading">ICAI Disclaimer</h1>
                    <div className="space-y-6 text-corporate-text leading-relaxed font-medium">
                        <p>
                            The patterns and guidance provided by the Institute of Chartered Accountants of India (ICAI) strictly prohibit any form of advertisement or solicitation by Chartered Accountants.
                        </p>
                        <p>
                            By clicking "Enter" or accessing this website, the user acknowledges that:
                        </p>
                        <ul className="list-disc pl-6 space-y-4">
                            <li>The user wishes to gain more information about <strong className="text-brand-navy">JN Shah Associates</strong> for their own information and use.</li>
                            <li>There has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from the firm or any of its partners to solicit any work through this website.</li>
                            <li>The information provided in the website is for informational purposes only and does not constitute professional advice or a formal representation of the firm.</li>
                            <li>The firm is not liable for any action taken by the user relying on the material/information provided on this website.</li>
                        </ul>
                        <p className="pt-6 border-t border-brand-ice font-bold text-brand-navy">
                            This website is intended to be compliant with the guidelines issued by ICAI regarding professional ethics and digital presence.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Disclaimer;
