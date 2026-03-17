import { motion } from 'framer-motion';
import { Calendar, MessageSquare, ChevronRight, Edit2, Trash2, Calculator, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardSidebar = ({
    deadlines,
    isAdmin,
    handleEditClick,
    deleteDeadline,
    setShowDeadlineModal
}) => {
    return (
        <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className="space-y-4">
                <div className="flex items-center justify-between" id="compliance-calendar">
                    <h3 className="text-xl font-black text-brand-navy font-heading">Compliance Calendar</h3>
                    {isAdmin && (
                        <button
                            onClick={() => setShowDeadlineModal(true)}
                            className="text-[10px] font-black text-brand-primary border border-brand-primary/20 px-2 py-1 rounded-md hover:bg-brand-primary/10 transition-all uppercase"
                        >
                            + Add Task
                        </button>
                    )}
                </div>
                <div className="bg-white rounded-3xl border border-brand-ice shadow-sm p-6 space-y-4">
                    {deadlines.length > 0 ? deadlines.map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between group cursor-pointer p-2 hover:bg-brand-bg rounded-2xl transition-all">
                            <div className="flex items-start space-x-3">
                                <div className={`mt-1.5 w-2 h-2 rounded-full ${item.urgency === 'Critical' ? 'bg-red-500' : item.urgency === 'High' ? 'bg-orange-500' : 'bg-brand-primary'}`}></div>
                                <div>
                                    <p className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">{item.task}</p>
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-brand-navy/40 mt-1 uppercase">
                                        <Calendar className="w-3 h-3" />
                                        <span>Due: {new Date(item.due_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {isAdmin ? (
                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className="p-1.5 hover:bg-white rounded-lg text-brand-navy/40 hover:text-brand-primary transition-colors"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => deleteDeadline(item.id)}
                                            className="p-1.5 hover:bg-white rounded-lg text-brand-navy/40 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-brand-navy/20 group-hover:text-brand-primary transition-colors" />
                                )}
                            </div>
                        </div>
                    )) : (
                        <p className="text-xs text-center text-brand-navy/40 font-bold italic py-4">No upcoming deadlines.</p>
                    )}
                    <button className="w-full mt-4 py-3 bg-brand-bg text-brand-navy font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-ice transition-colors">
                        Sync to Calendar
                    </button>
                </div>
            </div>

            {/* Priority Support */}
            <div className="bg-brand-navy rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20">
                <MessageSquare className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 -rotate-12" />
                <div className="relative z-10 text-center">
                    <h4 className="text-lg font-black font-heading mb-2">Priority Support</h4>
                    <p className="text-sm font-medium text-white/70 mb-6 leading-relaxed">Need instant assistance with GST or Audit filings?</p>
                    <button className="w-full bg-white text-brand-navy py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-brand-ice active:scale-95">
                        Connect Now
                    </button>
                </div>
            </div>

            {/* Strategic Shortcuts */}
            {!isAdmin && (
                <div className="space-y-4">
                    <h3 className="text-xl font-black text-brand-navy font-heading">Strategic Hub</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { name: 'GST Filing Status', icon: FileText, link: 'https://www.gst.gov.in/', external: true },
                        ].map((tool, i) => {
                            const Content = (
                                <div className="flex items-center justify-between p-5 bg-white border border-brand-ice rounded-2xl hover:border-brand-primary/30 transition-all group w-full">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-brand-bg rounded-xl flex items-center justify-center text-brand-navy/40 group-hover:text-brand-primary transition-colors">
                                            <tool.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-brand-navy">{tool.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-brand-navy/20 group-hover:text-brand-primary transition-all" />
                                </div>
                            );

                            return tool.external ? (
                                <a key={i} href={tool.link} target="_blank" rel="noopener noreferrer" className="block">
                                    {Content}
                                </a>
                            ) : (
                                <Link key={i} to={tool.link}>
                                    {Content}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardSidebar;
