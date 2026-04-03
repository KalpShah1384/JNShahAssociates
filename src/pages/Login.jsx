import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  AlertCircle,
  User,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Logo from "../assets/CA_logo.png";
import SEO from "../components/SEO";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isForgotPassword) {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${window.location.origin}/update-password`,
          },
        );
        if (resetError) {
          if (resetError.status === 400) {
            throw new Error(
              "Redirect URL not authorized. Please add http://localhost:5173/update-password to your Supabase Redirect URLs.",
            );
          }
          throw resetError;
        }
        setSuccessMessage("Password reset link sent to your email!");
        return;
      }

      if (isSignUp) {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              company_name: companyName,
            },
          },
        });

        if (authError) {
          if (authError.status === 422) {
            throw new Error(
              "This email is already registered or your password is too weak (Check your Supabase 8-character and symbol requirements).",
            );
          }
          throw authError;
        }

        setSuccessMessage(
          "Portal access requested! Check your email for verification.",
        );
        setTimeout(() => {
          setIsSignUp(false);
          setSuccessMessage(null);
        }, 4000);
      } else {
        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (authError) {
          if (authError.status === 400) {
            throw new Error(
              "Invalid login credentials. Please check your email and password.",
            );
          }
          throw authError;
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center bg-brand-bg relative overflow-hidden">
      <SEO
        title={
          isForgotPassword
            ? "Reset Password"
            : isSignUp
              ? "Client Registration"
              : "Client Login"
        }
        description="Secure client portal access for JN Shah Associates. Login, request access, or reset your password for the compliance dashboard."
      />
      {/* Background Decorative Elements */}
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
              <img
                src={Logo}
                alt="JN Shah Associates Logo"
                className="h-16 md:h-20 w-auto object-contain transition-transform hover:scale-105 duration-300"
              />
            </div>
            <h1
              style={{ fontFamily: "var(--font-trajan)" }}
              className="text-3xl md:text-4xl font-bold text-brand-navy mb-3 tracking-normal"
            >
              JN
              <span className="text-brand-primary ml-1">
                Shah Associates
              </span>
            </h1>
            <p className="text-brand-navy/60 font-black tracking-widest uppercase text-xs sm:text-sm md:text-base transition-all">
              {isForgotPassword
                ? "Reset Password"
                : isSignUp
                  ? "Client Registration"
                  : "Client Login"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <AnimatePresence mode="wait">
              {isSignUp && !isForgotPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                      </div>
                      <input
                        type="text"
                        required={isSignUp}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-brand-bg border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all duration-300 outline-none font-bold text-brand-navy"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">
                      Company / Organization
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-brand-bg border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all duration-300 outline-none font-bold text-brand-navy"
                        placeholder="Doe Enterprises Ltd."
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-brand-navy/30 group-focus-within:text-brand-primary transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-brand-bg border-2 border-transparent focus:border-brand-primary focus:bg-white rounded-2xl transition-all duration-300 outline-none font-bold text-brand-navy"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {!isForgotPassword && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-brand-navy/40 ml-1">
                  Secure Password
                </label>
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
            )}

            {!isSignUp && !isForgotPassword && (
              <div className="flex items-center justify-between text-sm py-2">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-brand-ice text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="text-brand-navy/60 font-bold group-hover:text-brand-navy transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-brand-primary font-black hover:text-brand-navy transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {isForgotPassword && (
              <div className="flex items-center justify-end text-sm py-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="text-brand-navy font-black hover:text-brand-primary transition-colors"
                >
                  Back to Login
                </button>
              </div>
            )}

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
                  <span>
                    {isForgotPassword
                      ? "Reset Password"
                      : isSignUp
                        ? "Create Account"
                        : "Authenticate"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-brand-ice flex flex-col items-center">
            <div className="flex items-center space-x-2 text-brand-navy/40 mb-6 font-bold text-sm">
              <Fingerprint className="w-4 h-4" />
              <span>
                {isSignUp ? "Already have access?" : "First time here?"}
              </span>
            </div>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setIsForgotPassword(false);
                setError(null);
                setSuccessMessage(null);
              }}
              className="text-brand-navy font-black text-sm uppercase tracking-widest hover:text-brand-primary transition-colors border-b-2 border-transparent hover:border-brand-primary pb-1"
            >
              {isSignUp ? "Proceed to Login" : "Request Portal Access"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-brand-navy/40 font-bold text-xs uppercase tracking-[0.2em]">
          Secure 256-Bit Encrypted Environment
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
