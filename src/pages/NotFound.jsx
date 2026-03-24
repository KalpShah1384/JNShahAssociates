import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <div className="pt-28 pb-24 min-h-[70vh] flex items-center justify-center bg-brand-bg">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on JN Shah Associates. Please check the URL or return to the homepage."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white max-w-lg w-full mx-4 p-10 rounded-[2.5rem] border border-brand-ice shadow-xl text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
            <AlertCircle className="w-9 h-9 text-brand-primary" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-3">
          Page Not Found
        </h1>
        <p className="text-corporate-text/80 text-sm md:text-base mb-8 font-medium leading-relaxed">
          The page you tried to access doesn&apos;t exist or may have been
          moved. Please check the URL or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-black uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-sm font-black uppercase tracking-widest"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
