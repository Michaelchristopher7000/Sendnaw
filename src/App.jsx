import { BrowserRouter, Routes, Route} from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

// Landing pages
import Home from "./pages/landing/home";
import About from "./pages/landing/about";
import Career from "./pages/landing/career";
import Contact from "./pages/landing/contact";
import FAQ from "./pages/landing/faq";
import Savings from "./pages/landing/savings";
import Multi from "./pages/landing/multi-currency-wallets";
import Loans from "./pages/landing/loan";
import VirtualCard from "./pages/landing/virtual-card";
import SignIn from "./pages/landing/signin";
import SignUp from "./pages/landing/signup";
import HowItWorks from "./pages/landing/how-it-works";
import PrivacyPolicy from "./pages/landing/privacy-policy";
import TermsConditions from "./pages/landing/terms";
import AccountRecovery from "./pages/landing/account-recovery";
import SendnawPay from "./pages/landing/sendnawpay";
import InstantTransfers from "./pages/landing/instant-transfers";
import Cashback from "./pages/landing/cashback";
import BillsAirtime from "./pages/landing/bills-airtime";
import GiftCard from "./pages/landing/gift-card";
import ChatModal from "./components/chatmodal";

// Dashboard pages
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard/dashboard";
import SendMoney from "./pages/dashboard/send-money";
import Withdraw from "./pages/dashboard/withdraw";
import KycPage from "./pages/dashboard/kyc";
import Profile from "./pages/dashboard/profile";
import Settings from "./pages/dashboard/settings";
import TransactionHistory from "./pages/dashboard/transactions";
import Sessions from "./pages/dashboard/session";
import Invest from "./pages/dashboard/invest";
import Bills from "./pages/dashboard/bills";
import VirtualCards from "./pages/dashboard/virtual";
import Ajo from "./pages/dashboard/ajo";
import SavingsPlan from "./pages/dashboard/saving";
import GiftCards from "./pages/dashboard/giftcards";
import LoansDashboard from "./pages/dashboard/loans";
import ViewReceipt from "./pages/dashboard/receipts";
import Airtime from "./pages/dashboard/airtime";
import Data from "./pages/dashboard/data";
import Notifications from "./pages/dashboard/notifications";
import Services from "./pages/dashboard/services";
import Gadgets from "./pages/dashboard/gadgets";
import Converts from "./pages/dashboard/convert";

import ThemeProvider from "./context/themecontext";

// Admin pages (single component that handles all tabs)
// import AdminDashboard from "./pages/admin/dashboard";
// import AdminLayout from "./pages/admin/AdminLayout";

// If you prefer separate components for each tab, uncomment the lines below
// import Withdrawals from "./pages/admin/Withdrawals";
// import Users from "./pages/admin/Users";
// import KycReview from "./pages/admin/kyc";
// import LoanApplications from "./pages/admin/adminLoans";
// import TierRequests from "./pages/admin/TierRequest";

// For liquidations, you need to create the component or remove the route
// import Liquidations from "./pages/admin/Liquidations"; // <-- create this file if needed

// Protected Route
import ProtectedRoute from "./components/protectedRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/multi-currency-wallets" element={<Multi />} />
          <Route path="/loan" element={<Loans />} />
          <Route path="/virtual-card" element={<VirtualCard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/account-recovery" element={<AccountRecovery />} />
          <Route path="/sendnawpay" element={<SendnawPay />} />
          <Route path="/instant-transfers" element={<InstantTransfers />} />
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/bills-airtime" element={<BillsAirtime />} />
          <Route path="/gift-card" element={<GiftCard />} />
          <Route path="/chat" element={<ChatModal />} />

          {/* Dashboard Routes - Protected (user) */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send-money" element={<SendMoney />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/receipts/:id" element={<ViewReceipt />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/airtime" element={<Airtime />} />
            <Route path="/data" element={<Data />} />
            <Route path="/virtual" element={<VirtualCards />} />
            <Route path="/ajo" element={<Ajo />} />
            <Route path="/saving" element={<SavingsPlan />} />
            <Route path="/giftcards" element={<GiftCards />} />
            <Route path="/loans" element={<LoansDashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/gadgets" element={<Gadgets />} />
            <Route path="/convert" element={<Converts />} />
            <Route path="/kyc" element={<KycPage />} />
            <Route path="/sessions" element={<Sessions />} />
          </Route>

          {/* Admin Routes - Protected (admin) */}
          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/users" replace />} />
            <Route
              path="dashboard"
              element={<Navigate to="/admin/users" replace />}
            />{" "}
            {/* ← add this line */}
            {/* <Route path="users" element={<AdminDashboard />} />
            <Route path="kyc" element={<AdminDashboard />} />
            <Route path="loans" element={<AdminDashboard />} />
            <Route path="withdrawals" element={<AdminDashboard />} />
            <Route path="liquidations" element={<AdminDashboard />} />
            <Route path="tier-requests" element={<AdminDashboard />} /> */}
          {/* </Route> */} 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
