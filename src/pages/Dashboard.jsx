import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    FileText,
    Calendar,
    Shield,
    Bell,
    Search,
    Download,
    Upload,
    Clock,
    CheckCircle2,
    AlertCircle,
    UserCircle,
    ChevronRight,
    MessageSquare,
    LogOut,
    Edit2,
    Trash2,
    Briefcase,
    Receipt,
    FileSpreadsheet,
    Building2,
    X,
    Camera,
    ExternalLink,
    Calculator,
    ChevronDown,
    Check
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import DashboardSearchBar from '../components/dashboard/DashboardSearchBar';
import DashboardHero from '../components/dashboard/DashboardHero';
import DocumentTable from '../components/dashboard/DocumentTable';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { DeadlineModal, NotificationModal, AdminNotificationModal, ProfileModal, UploadModal } from '../components/dashboard/Modals';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [allDocuments, setAllDocuments] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showDeadlineModal, setShowDeadlineModal] = useState(false);
    const [editingDeadlineId, setEditingDeadlineId] = useState(null);
    const [deadlineForm, setDeadlineForm] = useState({ task: '', due_date: '', urgency: 'High' });
    const [notification, setNotification] = useState({ show: false, title: '', message: '', type: 'alert', onConfirm: null });
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [noteInput, setNoteInput] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showAdminNotificationModal, setShowAdminNotificationModal] = useState(false);
    const [adminNotificationMessage, setAdminNotificationMessage] = useState('');
    const [adminNotificationTarget, setAdminNotificationTarget] = useState('ALL');
    const [isAdminTargetDropdownOpen, setIsAdminTargetDropdownOpen] = useState(false);
    const targetDropdownRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (targetDropdownRef.current && !targetDropdownRef.current.contains(event.target)) {
                setIsAdminTargetDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchDocuments = async (userId) => {
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('user_id', userId)
            .neq('status', 'Deleted')
            .order('created_at', { ascending: false });
        if (!error) setDocuments(data);
    };

    const fetchDeadlines = async (userId) => {
        const { data, error } = await supabase
            .from('deadlines')
            .select('*')
            .or(`target_user_id.is.null,target_user_id.eq.${userId}`)
            .order('due_date', { ascending: true });
        if (!error) setDeadlines(data);
    };

    const fetchAdminData = async () => {
        const { data: dl, error: dlError } = await supabase
            .from('deadlines')
            .select('*')
            .order('due_date', { ascending: true });
        if (!dlError) setDeadlines(dl);

        const { data: docs, error: docError } = await supabase
            .from('documents')
            .select('*')
            .neq('status', 'Deleted')
            .order('created_at', { ascending: false });
        if (!docError) setAllDocuments(docs);

        const { data: profs, error: profError } = await supabase
            .from('profiles')
            .select('id, full_name, company_name');
        if (!profError) {
            const profMap = {};
            profs.forEach(p => profMap[p.id] = p);
            setProfiles(profMap);
        }
    };

    const updateDocumentStatus = async (docId, newStatus, note = null) => {
        const updateData = { status: newStatus };
        if (note !== null) updateData.notes = note;
        const { error } = await supabase.from('documents').update(updateData).eq('id', docId);
        if (!error) {
            await fetchAdminData();
            setNotification({ show: true, title: 'Updated', message: 'Status saved successfully.', type: 'alert' });
        }
    };

    const filteredDocs = (isAdmin ? allDocuments : documents).filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                navigate('/login');
            } else {
                // Check if this is a temporary recovery session (Forgot Password flow)
                // Recovery sessions shouldn't have full access to the dashboard content
                const isRecovery = session.user?.amr?.some(m => m.method === 'recovery') || 
                                  window.location.hash.includes('type=recovery');

                if (isRecovery) {
                    navigate('/update-password');
                    return;
                }

                setUser(session.user);
                const { data: profileData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
                setProfile(profileData);
                if (profileData?.role === 'admin' || profileData?.role === 'ADMIN') {
                    setIsAdmin(true);
                    await fetchAdminData();
                } else {
                    await fetchDocuments(session.user.id);
                    await fetchDeadlines(session.user.id);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, [navigate]);

    const notifications = deadlines.filter(d => d.task && d.task.startsWith('[NOTIFICATION] '));
    const latestNotificationMessage = notifications.length > 0 ? notifications[0].task.replace('[NOTIFICATION] ', '') : 'Dashboard ready.';
    const normalDeadlines = deadlines.filter(d => !d.task || !d.task.startsWith('[NOTIFICATION] '));

    const handleNotifyClient = (clientId) => {
        setAdminNotificationTarget(clientId);
        setShowAdminNotificationModal(true);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleSendAdminNotification = async () => {
        if (!adminNotificationMessage) return;
        const payload = {
            task: `[NOTIFICATION] ${adminNotificationMessage}`,
            due_date: new Date().toISOString(),
            urgency: 'High',
            target_user_id: adminNotificationTarget === 'ALL' ? null : adminNotificationTarget
        };
        const { error } = await supabase.from('deadlines').insert([payload]);
        if (!error) {
            setNotification({ show: true, title: 'Success', message: 'Notification broadcasted successfully.', type: 'alert' });
            setAdminNotificationMessage('');
            setShowAdminNotificationModal(false);
            fetchAdminData();
        }
    };

    const handleReplaceDocument = async (doc, file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const filePath = `${doc.user_id}/${Math.random()}.${file.name.split('.').pop()}`;
            const { error: uploadError } = await supabase.storage.from('client-vault').upload(filePath, file);
            if (uploadError) throw uploadError;
            await supabase.from('documents').update({ file_url: filePath, name: file.name, status: 'In Review' }).eq('id', doc.id);
            if (isAdmin) await fetchAdminData();
            else await fetchDocuments(user.id);
            setNotification({ show: true, title: 'Success', message: 'Document replaced.', type: 'alert' });
        } catch (error) {
            console.error('Upload error:', error);
            setNotification({ show: true, title: 'Error', message: 'Failed to upload document.', type: 'alert' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleProfileUpdate = async (updates) => {
        setIsUploading(true);
        try {
            const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);
            if (error) throw error;
            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(profileData);
            setNotification({ show: true, title: 'Success', message: 'Profile updated successfully.', type: 'alert' });
            setShowProfileModal(false);
        } catch (error) {
            console.error('Profile update error:', error);
            setNotification({ show: true, title: 'Error', message: 'Failed to update profile.', type: 'alert' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleAvatarUpload = async (file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage.from('client-vault').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('client-vault').getPublicUrl(filePath);
            await handleProfileUpdate({ avatar_url: publicUrl });
        } catch (error) {
            console.error('Avatar upload error:', error);
            setNotification({ show: true, title: 'Error', message: 'Failed to upload avatar.', type: 'alert' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileUpload = async (file, category) => {
        if (!file || !category) return;
        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/${Date.now()}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage.from('client-vault').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { error: dbError } = await supabase.from('documents').insert([{
                user_id: user.id,
                name: file.name,
                category: category,
                file_url: filePath,
                status: 'In Review'
            }]);
            if (dbError) throw dbError;

            await fetchDocuments(user.id);
            setShowUploadModal(false);
            setNotification({ show: true, title: 'Success', message: 'Document uploaded successfully and is now under review.', type: 'alert' });
        } catch (error) {
            console.error('File upload error:', error);
            setNotification({ show: true, title: 'Error', message: 'Failed to upload document. Please try again.', type: 'alert' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteDocument = async (docId) => {
        setNotification({
            show: true,
            title: 'Delete?',
            message: 'Sure you want to remove this?',
            type: 'confirm',
            onConfirm: async () => {
                await supabase.from('documents').update({ status: 'Deleted' }).eq('id', docId);
                isAdmin ? await fetchAdminData() : await fetchDocuments(user.id);
                setNotification({ show: false });
            }
        });
    };

    const handleSaveNote = async (docId) => {
        await supabase.from('documents').update({ notes: noteInput }).eq('id', docId);
        isAdmin ? await fetchAdminData() : await fetchDocuments(user.id);
        setEditingNoteId(null);
        setNoteInput('');
        setNotification({ show: true, title: 'Success', message: 'Note saved successfully.', type: 'alert' });
    };

    const handleEditClick = (deadline) => {
        setEditingDeadlineId(deadline.id);
        setDeadlineForm({ task: deadline.task, due_date: deadline.due_date, urgency: deadline.urgency });
        setShowDeadlineModal(true);
    };

    const closeDeadlineModal = () => {
        setShowDeadlineModal(false);
        setEditingDeadlineId(null);
        setDeadlineForm({ task: '', due_date: '', urgency: 'High' });
    };

    const deleteDeadline = async (id) => {
        setNotification({
            show: true,
            title: 'Delete Task?',
            message: 'Are you sure?',
            type: 'confirm',
            onConfirm: async () => {
                await supabase.from('deadlines').delete().eq('id', id);
                await fetchAdminData();
                setNotification({ show: false });
            }
        });
    };

    const handleSubmitDeadline = async (e) => {
        e.preventDefault();
        const { task, due_date, urgency } = deadlineForm;
        if (editingDeadlineId) await supabase.from('deadlines').update({ task, due_date, urgency }).eq('id', editingDeadlineId);
        else await supabase.from('deadlines').insert([{ task, due_date, urgency }]);
        await fetchAdminData();
        closeDeadlineModal();
    };

    const stats = isAdmin ? [
        { label: 'Total Clients', value: Object.keys(profiles).length.toString().padStart(2, '0'), icon: UserCircle, color: 'brand-navy', onClick: () => setActiveTab('clients') },
        { label: 'Pending Review', value: allDocuments.filter(d => d.status === 'In Review').length.toString().padStart(2, '0'), icon: Clock, color: 'orange-500', onClick: () => { setActiveTab('overview'); setStatusFilter('In Review'); } },
        { label: 'Successful Filings', value: allDocuments.filter(d => d.status === 'Completed').length.toString().padStart(2, '0'), icon: CheckCircle2, color: 'emerald-500', onClick: () => { setActiveTab('overview'); setStatusFilter('Completed'); } },
        { label: 'Master Vault', value: allDocuments.length.toString(), icon: FileText, color: 'brand-primary', onClick: () => { setActiveTab('overview'); setStatusFilter('All'); } },
    ] : [
        { label: 'Cloud Vault', value: documents.length.toString().padStart(2, '0'), icon: FileText, color: 'brand-primary', onClick: () => setStatusFilter('All') },
        { label: 'Pending Filings', value: documents.filter(d => d.status === 'In Review').length.toString().padStart(2, '0'), icon: Clock, color: 'orange-500', onClick: () => setStatusFilter('In Review') },
        { label: 'Verified Files', value: documents.filter(d => d.status === 'Completed').length.toString().padStart(2, '0'), icon: CheckCircle2, color: 'emerald-500', onClick: () => setStatusFilter('Completed') },
        { label: 'Compliance Index', value: '98%', icon: Shield, color: 'emerald-500' },
    ];

    if (loading) return null;

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader
                    profile={profile}
                    isAdmin={isAdmin}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setShowProfileModal={setShowProfileModal}
                    handleLogout={handleLogout}
                    latestNotificationMessage={latestNotificationMessage}
                    setShowAdminNotificationModal={setShowAdminNotificationModal}
                    setNotification={setNotification}
                />

                <DashboardSearchBar
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                    showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal}
                    isUploading={isUploading}
                />

                {activeTab === 'overview' ? (
                    <div className="space-y-8 md:space-y-12">
                        <DashboardStats stats={stats} />
                        {!isAdmin && <DashboardHero setShowUploadModal={setShowUploadModal} documents={documents} />}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                            <div className="lg:col-span-2">
                                <DocumentTable 
                                    loading={loading} filteredDocs={filteredDocs} isAdmin={isAdmin} profiles={profiles}
                                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                    statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                                    updateDocumentStatus={updateDocumentStatus}
                                    editingNoteId={editingNoteId} setEditingNoteId={setEditingNoteId}
                                    noteInput={noteInput} setNoteInput={setNoteInput}
                                    handleSaveNote={handleSaveNote}
                                    handleDeleteDocument={handleDeleteDocument} handleReplaceDocument={handleReplaceDocument}
                                />
                            </div>
                            <DashboardSidebar deadlines={normalDeadlines} isAdmin={isAdmin} handleEditClick={handleEditClick} deleteDeadline={deleteDeadline} setShowDeadlineModal={setShowDeadlineModal} />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-brand-ice shadow-2xl shadow-brand-navy/5 overflow-hidden">
                        <div className="p-6 md:p-10 border-b border-brand-ice bg-[#fcfdfe]">
                            <h2 className="text-xl md:text-2xl font-black text-brand-navy font-heading">Client Directory</h2>
                            <p className="text-[10px] font-bold text-brand-navy/40 uppercase mt-1 tracking-widest">Profiles & Compliance Health</p>
                        </div>
                        
                        {/* Mobile Grid View / Desktop Table View */}
                        <div className="block md:hidden p-4 space-y-4">
                             {Object.values(profiles).map((client, idx) => (
                                <div key={idx} className="p-6 bg-brand-bg/40 border border-brand-ice rounded-3xl space-y-4">
                                     <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black">{client.full_name?.charAt(0)}</div>
                                        <div>
                                            <p className="text-sm font-black text-brand-navy">{client.full_name}</p>
                                            <p className="text-[10px] font-bold text-brand-navy/40 uppercase">{client.company_name || 'Individual'}</p>
                                        </div>
                                     </div>
                                     <div className="flex justify-between items-center pt-2 border-t border-brand-ice/50">
                                         <div className="flex items-center space-x-3">
                                            <button onClick={() => handleNotifyClient(client.id)} className="text-brand-primary font-black text-[10px] uppercase tracking-widest flex items-center">
                                                <Bell className="w-3 h-3 mr-1" /> Notify
                                            </button>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Vault Status</span>
                                         </div>
                                         <button onClick={() => setActiveTab('overview')} className="text-brand-primary font-black text-[10px] uppercase tracking-widest">Open Hub</button>
                                     </div>
                                </div>
                             ))}
                        </div>

                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#fcfdfe] border-b border-brand-ice">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest text-left">Client Identity</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest text-left">Company</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-brand-navy/40 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-ice/50 text-left">
                                    {Object.values(profiles).map((client, idx) => {
                                        const clientDocs = allDocuments.filter(d => d.user_id === client.id);
                                        const needsAction = clientDocs.some(d => d.status === 'Action Required');
                                        return (
                                            <tr key={idx} className="hover:bg-brand-bg transition-colors">
                                                <td className="px-8 py-6">
                                                   <div className="flex items-center space-x-4">
                                                       <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black">{client.full_name?.charAt(0)}</div>
                                                       <div>
                                                           <p className="text-sm font-black text-brand-navy">{client.full_name}</p>
                                                           <p className="text-[9px] font-bold text-brand-navy/40 tracking-tighter">ID: {client.id.substring(0,8)}</p>
                                                       </div>
                                                   </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-xs font-bold text-brand-navy">{client.company_name || 'Personal'}</p>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${needsAction ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>{needsAction ? 'Needs Action' : 'Compliant'}</span>
                                                </td>
                                                 <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <button 
                                                            onClick={() => handleNotifyClient(client.id)}
                                                            className="p-2 bg-brand-bg rounded-lg hover:bg-brand-primary hover:text-white transition-all text-brand-navy/40"
                                                            title="Notify Client"
                                                        >
                                                            <Bell className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => setActiveTab('overview')} className="p-2 bg-brand-bg rounded-lg hover:bg-brand-primary hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showDeadlineModal && <DeadlineModal showDeadlineModal={showDeadlineModal} deadlineForm={deadlineForm} setDeadlineForm={setDeadlineForm} closeDeadlineModal={closeDeadlineModal} handleSubmitDeadline={handleSubmitDeadline} editingDeadlineId={editingDeadlineId} />}
                {showAdminNotificationModal && (
                    <AdminNotificationModal
                        show={showAdminNotificationModal}
                        onClose={() => setShowAdminNotificationModal(false)}
                        onSend={handleSendAdminNotification}
                        message={adminNotificationMessage}
                        setMessage={setAdminNotificationMessage}
                        target={adminNotificationTarget}
                        setTarget={setAdminNotificationTarget}
                        profiles={profiles}
                        isTargetDropdownOpen={isAdminTargetDropdownOpen}
                        setIsTargetDropdownOpen={setIsAdminTargetDropdownOpen}
                        targetDropdownRef={targetDropdownRef}
                    />
                )}
                {showProfileModal && (
                    <ProfileModal
                        show={showProfileModal}
                        onClose={() => setShowProfileModal(false)}
                        profile={profile}
                        user={user}
                        onUpdate={handleProfileUpdate}
                        onAvatarUpload={handleAvatarUpload}
                        isUpdating={isUploading}
                    />
                )}
                {showUploadModal && (
                    <UploadModal
                        show={showUploadModal}
                        onClose={() => setShowUploadModal(false)}
                        onUpload={handleFileUpload}
                        isUploading={isUploading}
                    />
                )}
            </AnimatePresence>
            
            <NotificationModal notification={notification} setNotification={setNotification} />
        </div>
    );
};

export default Dashboard;
