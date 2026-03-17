import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, Download, CheckCircle2, Clock, AlertCircle, MessageSquare, ChevronRight, Eye, Trash2, UploadCloud, ChevronDown, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useState, useRef, useEffect } from 'react';

const STATUS_ACTIONS = [
    { value: 'Completed', label: 'Verify', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { value: 'In Review', label: 'Pending', icon: Clock, color: 'text-brand-primary', bg: 'bg-brand-primary/5' },
    { value: 'Action Required', label: 'Flag', icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
];

const StatusDropdown = ({ doc, updateDocumentStatus }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center space-x-1.5 text-[9px] font-black uppercase tracking-widest transition-all px-3 py-1.5 rounded-xl border ${isOpen ? 'border-brand-primary text-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/10' : 'border-brand-ice text-brand-navy/50 hover:border-brand-primary/30 hover:text-brand-navy bg-white'}`}
            >
                <span>Change Status</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white border border-brand-ice shadow-2xl rounded-2xl p-1.5 z-50 origin-top-left overflow-hidden"
                    >
                        <div className="px-3 py-2 mb-1 border-b border-brand-ice/50">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-brand-navy/40">Update Status</h4>
                        </div>
                        <div className="space-y-0.5 mt-1">
                            {STATUS_ACTIONS.map((action) => {
                                const isSelected = doc.status === action.value;
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={action.value}
                                        onClick={() => {
                                            updateDocumentStatus(doc.id, action.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${isSelected ? `${action.bg} ${action.color}` : 'text-brand-navy hover:bg-brand-bg/80'}`}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <Icon className="w-3.5 h-3.5" />
                                            <span>{action.label}</span>
                                        </span>
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const DocumentTable = ({
    loading,
    filteredDocs,
    isAdmin,
    profiles,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    updateDocumentStatus,
    editingNoteId,
    setEditingNoteId,
    noteInput,
    setNoteInput,
    handleDeleteDocument,
    handleReplaceDocument,
    handleSaveNote
}) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-brand-navy font-heading">{isAdmin ? 'Master Vault' : 'Secure Vault'}</h3>
                <button 
                    onClick={() => {
                        if (setStatusFilter) setStatusFilter('All');
                        if (setSearchQuery) setSearchQuery('');
                    }}
                    className="text-brand-primary font-black text-xs uppercase tracking-widest hover:text-brand-navy transition-colors flex items-center"
                >
                    View Full Directory <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
            <div className="bg-white rounded-3xl border border-brand-ice shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#fcfdfe] border-b border-brand-ice">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">File Name</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Category</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Status</th>
                                <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-ice/50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4">
                                        <div className="p-2 space-y-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="animate-pulse flex items-center justify-between p-6 border-b border-brand-ice last:border-0">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-brand-bg rounded-xl" />
                                                        <div className="space-y-2">
                                                            <div className="h-4 w-32 bg-brand-bg rounded" />
                                                            <div className="h-3 w-20 bg-brand-bg rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="h-6 w-24 bg-brand-bg rounded-full" />
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredDocs.length > 0 ? (
                                filteredDocs.map((doc, idx) => (
                                    <tr key={idx} className="hover:bg-brand-bg/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-brand-ice/30 rounded-lg">
                                                    <FileText className="w-4 h-4 text-brand-navy" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-brand-navy truncate max-w-[150px] sm:max-w-xs">{doc.name}</p>
                                                    <p className="text-[10px] font-semibold text-brand-navy/40 uppercase">
                                                        {isAdmin ? (profiles[doc.user_id]?.full_name || 'Unknown Client') : new Date(doc.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-brand-bg rounded-full text-[10px] font-black text-brand-navy tracking-widest uppercase">{doc.category}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest">
                                                    {doc.status === 'Completed' ? (
                                                        <><CheckCircle2 className="w-3 h-3 text-emerald-500" /> <span className="text-emerald-500">Verified</span></>
                                                    ) : doc.status === 'In Review' ? (
                                                        <><Clock className="w-3 h-3 text-brand-primary" /> <span className="text-brand-primary">Processing</span></>
                                                    ) : (
                                                        <><AlertCircle className="w-3 h-3 text-orange-500" /> <span className="text-orange-500">Attention</span></>
                                                    )}
                                                </div>
                                                {doc.notes && (
                                                    <div className="mt-3 flex items-start space-x-3 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl max-w-sm">
                                                        <MessageSquare className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest mb-1">Instruction from Partner:</p>
                                                            <p className="text-[11px] font-bold text-orange-800 leading-relaxed italic line-clamp-3">"{doc.notes}"</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {isAdmin && (
                                                    <div className="mt-2 flex items-center space-x-3">
                                                        <StatusDropdown doc={doc} updateDocumentStatus={updateDocumentStatus} />
                                                        <button
                                                            onClick={() => {
                                                                setEditingNoteId(doc.id);
                                                                setNoteInput(doc.notes || '');
                                                            }}
                                                            className="text-[9px] font-black text-brand-primary uppercase tracking-widest hover:underline"
                                                        >
                                                            {doc.notes ? 'Edit Note' : '+ Note'}
                                                        </button>
                                                    </div>
                                                )}
                                                {editingNoteId === doc.id && (
                                                    <div className="mt-3 flex items-center space-x-2">
                                                        <input
                                                            type="text"
                                                            value={noteInput}
                                                            onChange={(e) => setNoteInput(e.target.value)}
                                                            placeholder="Add instruction note..."
                                                            className="flex-1 bg-brand-bg border border-brand-ice rounded-xl py-2 px-4 text-xs font-bold text-brand-navy outline-none focus:border-brand-primary transition-all"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleSaveNote(doc.id)}
                                                            className="px-4 py-2 bg-brand-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => { setEditingNoteId(null); setNoteInput(''); }}
                                                            className="px-3 py-2 bg-brand-bg text-brand-navy/40 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-brand-navy transition-all"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={async () => {
                                                        const { data, error } = await supabase.storage.from('client-vault').createSignedUrl(doc.file_url, 60);
                                                        if (error) {
                                                            console.warn("Signed URL Failed, trying Public URL instead:", error.message);
                                                            const { data: publicData } = supabase.storage.from('client-vault').getPublicUrl(doc.file_url);
                                                            if (publicData?.publicUrl) window.open(publicData.publicUrl, '_blank');
                                                        } else if (data?.signedUrl) {
                                                            window.open(data.signedUrl, '_blank');
                                                        }
                                                    }}
                                                    title="View Document"
                                                    className="p-2 bg-brand-bg rounded-lg text-brand-navy/60 hover:bg-brand-primary hover:text-white transition-all"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {isAdmin && (
                                                    <>
                                                        <label className="p-2 bg-brand-bg rounded-lg text-brand-navy/60 hover:bg-brand-primary hover:text-white transition-all cursor-pointer inline-flex items-center justify-center" title="Replace Document">
                                                            <UploadCloud className="w-4 h-4" />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    if (e.target.files && e.target.files.length > 0 && handleReplaceDocument) {
                                                                        handleReplaceDocument(doc, e.target.files[0]);
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                        <button
                                                            onClick={() => handleDeleteDocument && handleDeleteDocument(doc.id, doc.file_url)}
                                                            title="Delete Document"
                                                            className="p-2 bg-brand-bg rounded-lg text-brand-navy/60 hover:bg-red-500 hover:text-white transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                                            <div className="w-20 h-20 bg-brand-bg rounded-[2rem] flex items-center justify-center mb-6 relative">
                                                <FileText className="w-8 h-8 text-brand-navy/20" />
                                                <div className="absolute inset-0 bg-brand-primary/5 rounded-[2rem] animate-ping opacity-20" />
                                            </div>
                                            <h4 className="text-xl font-black text-brand-navy font-heading mb-2">{searchQuery ? "No Results Found" : "Vault is Empty"}</h4>
                                            <p className="text-sm font-bold text-brand-navy/40 max-w-xs">{searchQuery
                                                ? `We couldn't find anything matching "${searchQuery}". Try a different file name or client.`
                                                : (isAdmin ? "No documents have been uploaded to the master vault yet." : "Your secure vault is empty. Upload your first document to get started.")
                                            }</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DocumentTable;
