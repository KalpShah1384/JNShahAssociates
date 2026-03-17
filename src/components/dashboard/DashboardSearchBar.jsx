import { Search, Upload, ChevronDown, Check, Filter } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_OPTIONS = [
    { value: 'All', label: 'All Status' },
    { value: 'In Review', label: 'Reviewing' },
    { value: 'Completed', label: 'Verified' },
    { value: 'Action Required', label: 'Action Req.' },
    { value: 'Flagged', label: 'Flagged' },
];

const DashboardSearchBar = ({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    showUploadModal,
    setShowUploadModal,
    isUploading
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabel = STATUS_OPTIONS.find(opt => opt.value === statusFilter)?.label || 'All Status';

    return (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-8">
            <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="w-full bg-white border border-brand-ice rounded-2xl py-3.5 md:py-4 pl-12 pr-4 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 font-bold text-brand-navy text-sm md:text-base transition-all shadow-sm"
                />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Custom Shadcn-style Dropdown for Status Filter */}
                <div className="relative flex-1 sm:flex-none" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full flex items-center justify-between min-w-[140px] md:min-w-[160px] bg-white border ${isDropdownOpen ? 'border-brand-primary ring-4 ring-brand-primary/10 shadow-md' : 'border-brand-ice shadow-sm hover:shadow-md'} rounded-2xl py-3.5 md:py-4 px-5 outline-none font-bold text-brand-navy text-[10px] md:text-[11px] uppercase tracking-widest transition-all cursor-pointer`}
                    >
                        <span className="flex items-center space-x-2">
                            <Filter className="w-3.5 h-3.5 text-brand-navy/40" />
                            <span>{selectedLabel}</span>
                        </span>
                        <ChevronDown className={`w-4 h-4 text-brand-navy/40 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-brand-primary' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute right-0 top-full mt-2 w-full sm:w-56 bg-white border border-brand-ice shadow-2xl rounded-2xl p-1.5 z-50 origin-top-right overflow-hidden"
                            >
                                <div className="px-2 py-2 mb-1 border-b border-brand-ice/50">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Status Filter</h4>
                                </div>
                                <div className="space-y-0.5 mt-1">
                                    {STATUS_OPTIONS.map((option) => {
                                        const isSelected = statusFilter === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setStatusFilter(option.value);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${isSelected ? 'bg-brand-primary/5 text-brand-primary' : 'text-brand-navy hover:bg-brand-bg/80'}`}
                                            >
                                                <span>{option.label}</span>
                                                {isSelected && <Check className="w-4 h-4 text-brand-primary" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex-1 sm:flex-none whitespace-nowrap bg-brand-navy hover:bg-brand-primary text-white py-3.5 md:py-4 px-6 md:px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center justify-center space-x-2 shadow-xl shadow-brand-navy/10 transition-all active:scale-95 cursor-pointer"
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Securing...' : 'Upload File'}</span>
                </button>
            </div>
        </div>
    );
};

export default DashboardSearchBar;
