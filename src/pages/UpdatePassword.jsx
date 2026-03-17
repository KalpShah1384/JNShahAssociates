import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Logo from '../assets/CA_logo.png';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there is a session/token for password reset
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError("Invalid or expired password reset link.");
            }
        };
        checkSession();
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) throw updateError;

            setSuccessMessage("Password updated successfully! Redirecting to login...");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to update password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-brand-bg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-3xl -ml-64 -mb-64" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-brand-navy/5 border border-brand-ice relative z-10">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <div className="mb-6">
                            <img src={Logo} alt="JN Shah Associates Logo" className="h-16 md:h-20 w-auto object-contain" />
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-bold text-brand-navy mb-3">
                            Update <span className="text-brand-primary italic">Password</span>
                        </h1>
                        <p className="text-brand-navy/60 font-black tracking-widest uppercase text-xs">
                            Secure your account
                        </p>
                    </div>

                    <form onSubmit={handleUpdatePassword} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">New Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-brand-bg border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all duration-300 outline-none font-bold text-brand-navy"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-brand-bg border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all duration-300 outline-none font-bold text-brand-navy"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center space-x-3 text-red-600 text-sm font-bold"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center space-x-3 text-emerald-600 text-sm font-bold"
                            >
                                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                                <span>{successMessage}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-navy hover:bg-brand-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-navy/20 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center space-x-3"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Update Password</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default UpdatePassword;
