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

            <div className="flex items-center justify-between sm:justify-start gap-4 md:gap-6 bg-white md:bg-transparent p-3 md:p-0 rounded-2xl border border-brand-ice md:border-none shadow-sm md:shadow-none">
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
                    className="p-3 bg-brand-bg md:bg-white rounded-xl border border-brand-ice text-brand-navy/40 hover:text-brand-primary hover:border-brand-primary transition-all relative group flex-1 sm:flex-none flex items-center justify-center"
                >
                    <BellIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>

                <button
                    onClick={() => setShowProfileModal(true)}
                    className="flex items-center space-x-3 bg-brand-bg md:bg-white px-4 py-2 rounded-2xl border border-brand-ice shadow-sm hover:border-brand-primary/30 transition-all active:scale-95 flex-[2] sm:flex-none justify-center sm:justify-start"
                >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-primary/10 rounded-full flex items-center justify-center overflow-hidden border border-brand-ice shrink-0">
                        {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-5 h-5 text-brand-primary" />
                        )}
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-xs font-black uppercase text-brand-navy tracking-widest">{profile?.full_name?.split(' ')[0] || 'User'}</p>
                        <p className="text-[10px] font-bold text-brand-navy/40">{isAdmin ? 'Admin' : 'Client'}</p>
                    </div>
                </button>

                <button
                    onClick={handleLogout}
                    className="p-3 bg-red-50 text-red-500 rounded-xl border border-red-100/50 md:border-none hover:bg-red-500 hover:text-white transition-all group flex-1 sm:flex-none flex items-center justify-center"
                    title="Sign Out"
                >
                    <LogOutIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
