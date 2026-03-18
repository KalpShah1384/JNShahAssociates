import { motion } from 'framer-motion';
import { Bell as BellIcon, UserCircle as UserIcon, LogOut as LogOutIcon } from 'lucide-react';

const DashboardHeader = ({ 
    profile, 
    isAdmin, 
    activeTab, 
    setActiveTab, 
    setShowProfileModal, 
    handleLogout,
    latestNotificationMessage,
    setShowAdminNotificationModal,
    setNotification
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-6 md:space-y-0">
            <div>
                <h1 className="text-3xl font-black text-brand-navy font-heading tracking-tight">
                    {isAdmin ? 'Admin Control Center' : 'Client Portal'}
                </h1>
                <p className="text-brand-navy/60 font-bold mt-1">
                    Welcome back, <span className="text-brand-primary">{profile?.full_name || 'Associate'}</span>
                    {isAdmin && <span className="ml-2 px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] rounded-md border border-brand-primary/20">ADMIN ACCESS</span>}
                </p>

                {isAdmin && (
                    <div className="flex items-center space-x-2 mt-6 p-1 bg-brand-bg w-full sm:w-fit rounded-xl border border-brand-ice overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-navy/40 hover:text-brand-navy'}`}
                        >
                            Master Vault
                        </button>
                        <button
                            onClick={() => setActiveTab('clients')}
                            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'clients' ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-navy/40 hover:text-brand-navy'}`}
                        >
                            Client Directory
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop action bar */}
            <div className="hidden md:flex items-center gap-6">
                <button 
                    onClick={() => {
                        if (isAdmin) {
                            setShowAdminNotificationModal(true);
                        } else {
                            setNotification({
                                show: true,
                                title: 'Latest Notification',
                                message: latestNotificationMessage || 'No new notifications at this time.',
                                type: 'alert'
                            });
                        }
                    }}
                    className="p-3 bg-white rounded-xl border border-brand-ice text-brand-navy/40 hover:text-brand-primary hover:border-brand-primary transition-all relative group"
                >
                    <BellIcon className="w-6 h-6 group-hover:animate-bounce" />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>

                <button
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center space-x-3 bg-white px-4 py-2 rounded-2xl border border-brand-ice shadow-sm hover:border-brand-primary/30 transition-all active:scale-95"
                >
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center overflow-hidden border border-brand-ice shrink-0">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-5 h-5 text-brand-primary" />
                        )}
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-black uppercase text-brand-navy tracking-widest">{profile?.full_name?.split(' ')[0] || 'User'}</p>
                        <p className="text-[10px] font-bold text-brand-navy/40">{isAdmin ? 'Admin' : 'Client'}</p>
                    </div>
                </button>

                <button
                    onClick={handleLogout}
                    className="p-3 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all group"
                    title="Sign Out"
                >
                    <LogOutIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile action bar — redesigned as a profile card */}
            <div className="flex md:hidden items-center bg-white rounded-2xl border border-brand-ice shadow-sm p-3 gap-3">
                {/* Avatar + Info */}
                <button
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center gap-3 flex-1 min-w-0 active:scale-[0.98] transition-transform"
                >
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center overflow-hidden border-2 border-brand-primary/20 shrink-0">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-5 h-5 text-brand-primary" />
                        )}
                    </div>
                    <div className="text-left min-w-0">
                        <p className="text-sm font-black text-brand-navy truncate">{profile?.full_name?.split(' ')[0] || 'User'}</p>
                        <p className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-wider">{isAdmin ? 'Admin' : 'Client'}</p>
                    </div>
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-brand-ice shrink-0"></div>

                {/* Action Icons */}
                <div className="flex items-center gap-1.5 shrink-0">
                    <button 
                        onClick={() => {
                            if (isAdmin) {
                                setShowAdminNotificationModal(true);
                            } else {
                                setNotification({
                                    show: true,
                                    title: 'Latest Notification',
                                    message: latestNotificationMessage || 'No new notifications at this time.',
                                    type: 'alert'
                                });
                            }
                        }}
                        className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-navy/40 hover:text-brand-primary relative transition-colors"
                    >
                        <BellIcon className="w-[18px] h-[18px]" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-[1.5px] border-white rounded-full"></span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        title="Sign Out"
                    >
                        <LogOutIcon className="w-[18px] h-[18px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
