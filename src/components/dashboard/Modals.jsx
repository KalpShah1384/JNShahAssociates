import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, X, Bell, Globe, User, Camera, Mail, Building2, Upload, FileText, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';

const DeadlineModal = ({
    showDeadlineModal,
    closeDeadlineModal,
    handleSubmitDeadline,
    editingDeadlineId,
    deadlineForm,
    setDeadlineForm
}) => {
    if (!showDeadlineModal) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeDeadlineModal}
                className="absolute inset-0 bg-brand-navy/40 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden border border-brand-ice"
            >
                <div className="p-8">
                    <h3 className="text-2xl font-black text-brand-navy font-heading mb-6">
                        {editingDeadlineId ? 'Edit Deadline' : 'Create New Deadline'}
                    </h3>
                    <form onSubmit={handleSubmitDeadline} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-2">Task Description</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. GST GSTR-3B Filing"
                                className="w-full bg-brand-bg border border-brand-ice rounded-2xl py-4 px-5 outline-none focus:border-brand-primary font-bold text-brand-navy transition-all"
                                value={deadlineForm.task}
                                onChange={(e) => setDeadlineForm({ ...deadlineForm, task: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-2">Due Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-brand-bg border border-brand-ice rounded-2xl py-4 px-5 outline-none focus:border-brand-primary font-bold text-brand-navy transition-all"
                                    value={deadlineForm.due_date}
                                    onChange={(e) => setDeadlineForm({ ...deadlineForm, due_date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 mb-2">Urgency Level</label>
                                <select
                                    className="w-full bg-brand-bg border border-brand-ice rounded-2xl py-4 px-5 outline-none focus:border-brand-primary font-bold text-brand-navy transition-all appearance-none"
                                    value={deadlineForm.urgency}
                                    onChange={(e) => setDeadlineForm({ ...deadlineForm, urgency: e.target.value })}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-4 flex space-x-4">
                            <button
                                type="button"
                                onClick={closeDeadlineModal}
                                className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-brand-navy/40 hover:bg-brand-bg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all"
                            >
                                {editingDeadlineId ? 'Update Task' : 'Confirm Task'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

const NotificationModal = ({ notification, setNotification }) => {
    if (!notification.show) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
                onClick={() => setNotification({ show: false })}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-8 border border-brand-ice"
            >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${notification.type === 'confirm' ? 'bg-orange-500/10 text-orange-500' : 'bg-brand-primary/10 text-brand-primary'}`}>
                    {notification.type === 'confirm' ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-black text-brand-navy font-heading mb-2">{notification.title}</h3>
                <p className="text-sm font-bold text-brand-navy/60 mb-8 leading-relaxed">{notification.message}</p>

                <div className="flex space-x-3">
                    {notification.type === 'confirm' ? (
                        <>
                            <button
                                onClick={() => setNotification({ show: false })}
                                className="flex-1 py-3 rounded-2xl font-black uppercase tracking-widest text-xs text-brand-navy/40 hover:bg-brand-bg transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={notification.onConfirm}
                                className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-500/20 hover:scale-[1.02] transition-all"
                            >
                                Confirm
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setNotification({ show: false })}
                            className="w-full bg-brand-primary text-white py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all"
                        >
                            Understood
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const AdminNotificationModal = ({
    show,
    onClose,
    onSend,
    message,
    setMessage,
    target,
    setTarget,
    profiles,
    isTargetDropdownOpen,
    setIsTargetDropdownOpen,
    targetDropdownRef
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl border border-brand-ice overflow-hidden"
            >
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-brand-navy font-heading tracking-tight">Broadcast Notice</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Communications Center</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-brand-bg rounded-xl transition-colors">
                            <X className="w-5 h-5 text-brand-navy/40" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3">Notice Content</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your announcement or alert here..."
                                className="w-full bg-brand-bg border border-brand-ice rounded-2xl p-5 outline-none focus:border-brand-primary font-bold text-brand-navy transition-all h-32 resize-none"
                            />
                        </div>

                        <div className="relative" ref={targetDropdownRef}>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3">Target Audience</label>
                            <button
                                onClick={() => setIsTargetDropdownOpen(!isTargetDropdownOpen)}
                                className="w-full flex items-center justify-between bg-brand-bg border border-brand-ice rounded-2xl px-5 py-4 font-bold text-brand-navy"
                            >
                                <span className="flex items-center">
                                    {target === 'ALL' ? <Globe className="w-4 h-4 mr-2 text-brand-primary" /> : <User className="w-4 h-4 mr-2 text-brand-primary" />}
                                    {target === 'ALL' ? 'Global Broadcast (All Clients)' : (profiles[target]?.full_name || 'Select Client')}
                                </span>
                                <Bell className="w-4 h-4 text-brand-navy/20" />
                            </button>

                            {isTargetDropdownOpen && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-brand-ice rounded-2xl shadow-2xl p-2 z-50 max-h-60 overflow-y-auto">
                                    <button
                                        onClick={() => { setTarget('ALL'); setIsTargetDropdownOpen(false); }}
                                        className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center transition-colors ${target === 'ALL' ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-brand-bg'}`}
                                    >
                                        <Globe className="w-4 h-4 mr-3" /> All Clients
                                    </button>
                                    <div className="h-px bg-brand-ice my-2" />
                                    {Object.values(profiles).map(client => (
                                        <button
                                            key={client.id}
                                            onClick={() => { setTarget(client.id); setIsTargetDropdownOpen(false); }}
                                            className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center transition-colors ${target === client.id ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-brand-bg'}`}
                                        >
                                            <User className="w-4 h-4 mr-3" /> {client.full_name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={onSend}
                            disabled={!message}
                            className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-navy/20 hover:bg-brand-primary transition-all active:scale-95 disabled:opacity-50"
                        >
                            Send Notification
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ProfileModal = ({ show, onClose, profile, user, onUpdate, onAvatarUpload, isUpdating }) => {
    const [name, setName] = useState(profile?.full_name || '');

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ full_name: name });
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-brand-ice overflow-hidden"
            >
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-brand-navy font-heading tracking-tight">My Profile</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Personal identity & visuals</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-brand-bg rounded-xl transition-colors">
                            <X className="w-5 h-5 text-brand-navy/40" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center mb-10">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-3xl bg-brand-bg border-4 border-white shadow-xl overflow-hidden mb-4 transition-transform group-hover:scale-95">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-brand-primary/10 text-brand-primary font-black text-3xl">
                                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-2 right-2 p-2 bg-brand-primary text-white rounded-xl shadow-lg cursor-pointer hover:scale-110 active:scale-90 transition-all">
                                <Camera className="w-4 h-4" />
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={(e) => onAvatarUpload(e.target.files[0])}
                                    disabled={isUpdating}
                                />
                            </label>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Avatar Vault</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3 ml-1">Full Legal Name</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/20" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-brand-bg border border-brand-ice rounded-2xl py-4 pl-12 pr-5 outline-none focus:border-brand-primary font-bold text-brand-navy"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3 ml-1">Registered Email</label>
                            <div className="relative opacity-60">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/20" />
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="w-full bg-brand-bg border border-brand-ice rounded-2xl py-4 pl-12 pr-5 font-bold text-brand-navy cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3 ml-1">Organization / Enterprise</label>
                            <div className="relative opacity-60">
                                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/20" />
                                <input
                                    type="text"
                                    value={profile?.company_name || 'Individual'}
                                    readOnly
                                    className="w-full bg-brand-bg border border-brand-ice rounded-2xl py-4 pl-12 pr-5 font-bold text-brand-navy cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating || (name === profile?.full_name)}
                            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {isUpdating ? 'Synchronizing...' : 'Commit Changes'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

const UPLOAD_CATEGORIES = [
    { group: 'Account Services', items: ['BookKeeping', 'Income Tax Returns', 'Income Tax Assessment', 'TDS Registration', 'TDS Returns'] },
    { group: 'GST Services', items: ['GST Returns', 'GST Registrations', 'GST Assessment', 'E-way Bill'] },
    { group: 'Business Services', items: ['Company/LLP Registrations', 'MCA services', 'Project Financing', 'Subsidies', 'DSC'] },
];

const UploadModal = ({ show, onClose, onUpload, isUploading }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const fileInputRef = useRef(null);
    const categoryDropdownRef = useRef(null);

    if (!show) return null;

    const handleSubmit = () => {
        if (!selectedFile || !selectedCategory) return;
        onUpload(selectedFile, selectedCategory);
        setSelectedFile(null);
        setSelectedCategory('');
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl border border-brand-ice overflow-hidden"
            >
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-brand-navy font-heading tracking-tight">Upload Document</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Secure Cloud Vault</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-brand-bg rounded-xl transition-colors">
                            <X className="w-5 h-5 text-brand-navy/40" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Category Selector */}
                        <div className="relative" ref={categoryDropdownRef}>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3 ml-1">Filing Category</label>
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className="w-full flex items-center justify-between bg-brand-bg border border-brand-ice rounded-2xl px-5 py-4 font-bold text-brand-navy transition-all hover:border-brand-primary/30"
                            >
                                <span className="flex items-center">
                                    <FileText className="w-4 h-4 mr-3 text-brand-navy/30" />
                                    {selectedCategory || 'Select a category...'}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-brand-navy/30 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isCategoryOpen && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-brand-ice rounded-2xl shadow-2xl p-2 z-50 max-h-60 overflow-y-auto">
                                    {UPLOAD_CATEGORIES.map(group => (
                                        <div key={group.group}>
                                            <p className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-brand-navy/30">{group.group}</p>
                                            {group.items.map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => { setSelectedCategory(item); setIsCategoryOpen(false); }}
                                                    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-colors ${selectedCategory === item ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-brand-bg text-brand-navy'}`}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* File Picker */}
                        <div>
                            <label className="block text-[11px] font-black uppercase tracking-widest text-brand-navy/40 mb-3 ml-1">Select File</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-brand-bg border-2 border-dashed border-brand-ice rounded-2xl p-8 text-center cursor-pointer hover:border-brand-primary/40 transition-all group"
                            >
                                <Upload className="w-8 h-8 text-brand-navy/20 mx-auto mb-3 group-hover:text-brand-primary transition-colors" />
                                {selectedFile ? (
                                    <p className="text-sm font-black text-brand-navy">{selectedFile.name}</p>
                                ) : (
                                    <>
                                        <p className="text-sm font-bold text-brand-navy/60">Click to browse files</p>
                                        <p className="text-[10px] font-bold text-brand-navy/30 mt-1">PDF, DOCX, XLSX, Images</p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedFile || !selectedCategory || isUploading}
                            className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-navy/20 hover:bg-brand-primary transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            {isUploading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Encrypting & Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    <span>Upload to Vault</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export { DeadlineModal, NotificationModal, AdminNotificationModal, ProfileModal, UploadModal };
