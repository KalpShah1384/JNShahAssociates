import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Clock, CheckCircle2, UserCircle, Shield } from 'lucide-react';

const DashboardStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {stats.map((stat, idx) => {
                const isActive = (stat.label === 'Master Archive' || stat.label === 'Cloud Documents') && stat.statusFilter === 'All' ||
                    (stat.label === 'Pending Review' || stat.label === 'Pending Filings') && stat.statusFilter === 'In Review' ||
                    (stat.label === 'Successful Filings' || stat.label === 'Verified Files') && stat.statusFilter === 'Completed' ||
                    (stat.label === 'Total Clients' && stat.activeTab === 'clients');

                return (
                    <motion.button
                        key={idx}
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={stat.onClick}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`bg-white p-5 md:p-6 rounded-3xl border transition-all text-center sm:text-left w-full group relative overflow-hidden ${isActive
                            ? 'border-brand-primary shadow-lg shadow-brand-primary/5 ring-4 ring-brand-primary/5'
                            : 'border-brand-ice shadow-sm hover:shadow-md hover:border-brand-primary/30'
                            }`}
                    >
                        {isActive && (
                            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-bl-full -mr-8 -mt-8 flex items-center justify-center">
                                <div className="w-2 h-2 bg-brand-primary rounded-full mt-4 mr-4 animate-pulse" />
                            </div>
                        )}
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${isActive ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-navy'} flex items-center justify-center mb-4 transition-colors mx-auto sm:mx-0`}>
                            <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${isActive ? 'text-brand-primary' : 'text-brand-navy/40 group-hover:text-brand-navy'}`}>{stat.label}</p>
                        <p className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${isActive ? 'text-brand-navy' : 'text-brand-navy'}`}>{stat.value}</p>
                    </motion.button>
                );
            })}
        </div>
    );
};

export default DashboardStats;
