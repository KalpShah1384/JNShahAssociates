import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ExternalLink, Calendar, Bell, Filter, Grid, LayoutList } from 'lucide-react';
import SEO from '../components/SEO';

const KnowledgeHub = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // grid or list

    const fetchNews = async () => {
        setLoading(true);
        try {
            const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
            
            // Primary specific query
            const primaryQuery = 'ICAI OR "Income Tax" OR "GST India" OR "MCA Update" OR "Audit"';
            let url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(primaryQuery)}&language=en&country=in`;
            
            let response = await fetch(url);
            let data = await response.json();
            
            // Fallback: If 0 specific results in 48h, try broader finance/business news
            if (data.status === 'success' && (!data.results || data.results.length === 0)) {
                console.log("Empty specific news, using broad finance/business fallback...");
                const fallbackQuery = 'finance india OR "business news" OR "economy"';
                url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(fallbackQuery)}&language=en&country=in`;
                response = await fetch(url);
                data = await response.json();
            }
            
            if (data.status === 'success' && data.results) {
                // Keep professional filtering
                const caNews = data.results.filter(article => {
                    const content = (article.title + (article.description || '')).toLowerCase();
                    const caKeywords = ['tax', 'icai', 'gst', 'finance', 'audit', 'regulation', 'compliance', 'mca', 'rbi', 'budget', 'statutory', 'business', 'economy'];
                    return caKeywords.some(key => content.includes(key));
                });
                
                setNews(caNews.length > 0 ? caNews : data.results);
            }
        } catch (error) {
            console.error('Error fetching knowledge hub news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const filteredNews = news.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-[#f8f9fb]">
            <SEO 
                title="Knowledge Hub - Latest CA & Tax Updates" 
                description="Stay updated with the latest changes in GST, Income Tax, Corporate Laws, and financial regulations in India."
            />
            
            {/* Header Section */}
            <section className="bg-brand-navy pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary opacity-10 rounded-full blur-[120px] -mr-32 -mt-32" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center space-x-3 text-brand-primary mb-6">
                            <Bell className="w-5 h-5 animate-pulse" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Compliance Intelligence</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white font-heading leading-tight mb-6">
                            Statutory Knowledge <span className="text-brand-primary italic">Vault</span>
                        </h1>
                        <p className="text-base sm:text-lg text-white/60 font-medium max-w-2xl leading-relaxed">
                            A curated repository of regulatory transitions, advisory notifications, and professional updates across Direct Taxation, GST, and MCA compliances.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-12 relative z-20">
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl shadow-brand-navy/10 border border-brand-ice">
                    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search regulations, circulars, or keywords..."
                                className="w-full bg-brand-bg/50 border border-brand-ice rounded-2xl py-3 md:py-4 pl-12 pr-4 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 font-bold text-brand-navy transition-all"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button 
                                onClick={fetchNews}
                                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-brand-navy text-white px-6 py-3 md:py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-brand-primary transition-all shadow-lg active:scale-95 whitespace-nowrap"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span>{loading ? 'Refreshing...' : 'Refresh Hub'}</span>
                            </button>
                            <div className="hidden sm:flex items-center bg-brand-bg rounded-2xl p-1 border border-brand-ice">
                                <button 
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-navy/30'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 px-4 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-brand-primary' : 'text-brand-navy/30'}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Feed Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] border border-brand-ice p-8 animate-pulse h-80">
                                <div className="flex justify-between mb-8">
                                    <div className="w-24 h-4 bg-brand-bg rounded-full" />
                                    <div className="w-16 h-4 bg-brand-bg rounded-full" />
                                </div>
                                <div className="w-full h-8 bg-brand-bg rounded-xl mb-4" />
                                <div className="w-3/4 h-8 bg-brand-bg rounded-xl mb-8" />
                                <div className="w-full h-20 bg-brand-bg rounded-2xl" />
                            </div>
                        ))}
                    </div>
                ) : filteredNews.length > 0 ? (
                    <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10" 
                        : "space-y-6"
                    }>
                        {filteredNews.map((article, idx) => (
                            <motion.article
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                viewport={{ once: true }}
                                className={`bg-white rounded-[2.5rem] md:rounded-[3rem] border border-brand-ice p-6 md:p-10 hover:shadow-2xl hover:shadow-brand-navy/5 transition-all group relative overflow-hidden flex flex-col h-full ${viewMode === 'list' ? 'md:flex-row md:items-center' : ''}`}
                            >
                                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-brand-navy/30 tracking-widest">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(article.pubDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" title="Verified Professional Content" />
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-black text-brand-navy mb-6 group-hover:text-brand-primary transition-colors leading-tight font-heading">
                                        {article.title}
                                    </h3>

                                    <p className="text-[13px] md:text-sm text-corporate-text/70 leading-relaxed font-bold mb-8 line-clamp-4">
                                        {article.description || 'Professional regulatory advisory regarding recent statutory transitions and compliance standards for corporate entities and practitioners.'}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <a
                                            href={article.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-brand-primary text-[11px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                                        >
                                            <span>Read Detailed circular</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                        {article.source_id && (
                                            <span className="text-[9px] font-black text-brand-navy/20 uppercase tracking-tighter">Source: {article.source_id.toUpperCase()}</span>
                                        )}
                                    </div>
                                </div>
                                {viewMode === 'list' && (
                                    <div className="hidden md:block ml-10 p-4 border-l border-brand-ice">
                                        <div className="p-10 bg-brand-bg rounded-[2rem] flex items-center justify-center">
                                            <Bell className="w-12 h-12 text-brand-navy/10" />
                                        </div>
                                    </div>
                                )}
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 border-2 border-dashed border-brand-ice rounded-[3rem]">
                        <Bell className="w-20 h-20 text-brand-navy/5 mx-auto mb-8" />
                        <h3 className="text-2xl font-black text-brand-navy mb-2">No Professional Records Found</h3>
                        <p className="text-sm font-bold text-brand-navy/40 max-w-sm mx-auto uppercase tracking-widest">Adjust your filters or sync with the latest statutory hub.</p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="mt-8 text-brand-primary font-black uppercase tracking-widest text-xs border-b-2 border-brand-primary pb-1"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </main>

            {/* Support CTA */}
            <section className="bg-white py-24 md:py-32 border-t border-brand-ice">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-navy mb-8 leading-tight">Need expert advisory on <span className="text-brand-primary italic">these updates?</span></h2>
                    <p className="text-base sm:text-lg text-corporate-text font-medium mb-12">Our partners are monitoring these transitions in real-time. Schedule a strategy call to evaluate the impact on your business.</p>
                    <Link to="/book" className="btn-primary px-12 py-5 shadow-2xl shadow-brand-primary/20">Consult Our Partners</Link>
                </div>
            </section>
        </div>
    );
};

export default KnowledgeHub;
