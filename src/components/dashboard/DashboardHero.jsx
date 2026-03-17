import { motion } from 'framer-motion';
import { FileSpreadsheet, Upload } from 'lucide-react';

const DashboardHero = ({ setShowUploadModal, documents = [] }) => {
    // Dynamically calculate the active services based on actual documents in the database
    const activeServices = [
        { id: 'tax', name: 'Direct Tax', categories: ['BookKeeping', 'Income Tax Returns', 'Income Tax Assessment', 'TDS Registration', 'TDS Returns'] },
        { id: 'gst', name: 'GST Filing', categories: ['GST Returns', 'GST Registrations', 'GST Assessment', 'E-way Bill'] },
        { id: 'advisory', name: 'Business Advisory', categories: ['Company/LLP Registrations', 'MCA services', 'Project Financing', 'Subsidies', 'DSC'] },
    ].map(service => {
        const serviceDocs = documents.filter(doc => service.categories.includes(doc.category));
        
        if (serviceDocs.length === 0) {
            return { name: service.name, status: 'Not Started', progress: 0, color: 'brand-navy' };
        }

        const completed = serviceDocs.filter(d => d.status === 'Completed').length;
        const needsAction = serviceDocs.some(d => d.status === 'Action Required' || d.status === 'Flagged');
        
        const progress = Math.round((completed / serviceDocs.length) * 100);
        
        let status = 'In Progress';
        if (progress === 100) status = 'Compliant';
        else if (needsAction) status = 'Action Req';

        return {
            name: service.name,
            status,
            progress,
            color: progress === 100 ? 'emerald-500' : (needsAction ? 'red-500' : 'brand-primary')
        };
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 bg-gradient-to-br from-brand-navy to-brand-navy/90 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20 active:scale-[0.99] transition-transform cursor-pointer group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="px-3 py-1 bg-brand-primary rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20">Priority Action</div>
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Assessment Year 2024-25</div>
                    </div>
                    <h2 className="text-3xl font-black font-heading mb-4 leading-tight">Complete your <span className="text-brand-primary">Income Tax</span> Filing</h2>
                    <p className="text-white/60 text-sm font-medium leading-relaxed max-w-lg mb-8">
                        Our compliance systems indicate that your final document set remains partially uploaded. Complete the submission to avoid late filing penalties and ensure maximum tax savings.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20 hover:scale-105 transition-all flex items-center justify-center"
                        >
                            <Upload className="w-4 h-4 mr-2" /> Upload Missing Files
                        </button>
                    </div>
                </div>
                <FileSpreadsheet className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-brand-ice p-8 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-brand-navy mb-8 border-b border-brand-ice pb-4 inline-block">Active Services</h3>
                <div className="space-y-4">
                    {activeServices.map((svc, i) => (
                        <div key={i} className="p-4 bg-brand-bg rounded-2xl border border-brand-ice/50 hover:border-brand-primary/30 transition-all group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[11px] font-black text-brand-navy group-hover:text-brand-primary transition-colors">{svc.name}</span>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${svc.progress === 100 ? 'bg-emerald-50 text-emerald-600' : (svc.status === 'Action Req' ? 'bg-red-50 text-red-600' : 'bg-brand-primary/10 text-brand-primary')}`}>
                                    {svc.status}
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-brand-ice rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${svc.progress}%` }}
                                    viewport={{ once: true }}
                                    className={`h-full transition-all duration-1000 ${svc.progress === 100 ? 'bg-emerald-500' : (svc.status === 'Action Req' ? 'bg-red-500' : 'bg-brand-primary')}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
