import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import SecurityPolicies from "./pages/SecurityPolicies";
import SuccessStories from "./pages/SuccessStories";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import KnowledgeHub from "./pages/KnowledgeHub";
import WhatsAppButton from "./components/WhatsAppButton";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ChatAgent from "./components/ChatAgent";
import { AgentProvider } from "./lib/agentContext.jsx";

// Service Pages
import DirectTax from "./pages/services/DirectTax";
import GSTSolutions from "./pages/services/GSTSolutions";
import AuditAssurance from "./pages/services/AuditAssurance";
import BusinessAdvisory from "./pages/services/BusinessAdvisory";
import ComplianceManagement from "./pages/services/ComplianceManagement";
import InternationalTax from "./pages/services/InternationalTax";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    style={{ minHeight: "100vh" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() =>
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    >
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/services"
          element={
            <PageWrapper>
              <Services />
            </PageWrapper>
          }
        />

        {/* Deep Service Routes */}
        <Route
          path="/services/tax"
          element={
            <PageWrapper>
              <DirectTax />
            </PageWrapper>
          }
        />
        <Route
          path="/services/gst"
          element={
            <PageWrapper>
              <GSTSolutions />
            </PageWrapper>
          }
        />
        <Route
          path="/services/audit"
          element={
            <PageWrapper>
              <AuditAssurance />
            </PageWrapper>
          }
        />
        <Route
          path="/services/advisory"
          element={
            <PageWrapper>
              <BusinessAdvisory />
            </PageWrapper>
          }
        />
        <Route
          path="/services/compliance"
          element={
            <PageWrapper>
              <ComplianceManagement />
            </PageWrapper>
          }
        />
        <Route
          path="/services/international"
          element={
            <PageWrapper>
              <InternationalTax />
            </PageWrapper>
          }
        />

        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="/knowledge-hub"
          element={
            <PageWrapper>
              <KnowledgeHub />
            </PageWrapper>
          }
        />
        <Route
          path="/book"
          element={
            <PageWrapper>
              <Booking />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/update-password"
          element={
            <PageWrapper>
              <UpdatePassword />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />

        <Route
          path="/privacy"
          element={
            <PageWrapper>
              <PrivacyPolicy />
            </PageWrapper>
          }
        />
        <Route
          path="/disclaimer"
          element={
            <PageWrapper>
              <Disclaimer />
            </PageWrapper>
          }
        />
        <Route
          path="/security"
          element={
            <PageWrapper>
              <SecurityPolicies />
            </PageWrapper>
          }
        />
        <Route
          path="/success-stories"
          element={
            <PageWrapper>
              <SuccessStories />
            </PageWrapper>
          }
        />

        {/* 404 - Page Not Found */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Auth session is managed via sessionStorage in lib/supabase.js
  // This automatically handles 'logout on tab close' without breaking page refreshes.

  return (
    <ErrorBoundary>
      <Router>
        <AgentProvider>
          <div className="min-h-screen flex flex-col overflow-x-hidden">
            <ScrollToTop />
            <Navbar />
            <main
              className="flex-grow relative bg-brand-bg"
              style={{ minHeight: "100vh" }}
            >
              <AnimatedRoutes />
            </main>
            <ChatAgent />
            <WhatsAppButton />
            <Footer />
          </div>
        </AgentProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
