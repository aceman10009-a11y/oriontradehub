import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "./services/analytics";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./pages/UserDetails";
import AppModal from "./components/AppModal";
import Security from "./pages/Security";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Settings from "./pages/Settings";
import CardServices from "./pages/CardServices";
import CardApplications from "./pages/admin/CardApplications";
import TawkChat from "./components/chat/TawkChat";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

export default function App() {
 return (
  <>
    {/* Google Analytics page tracking */}
    <AnalyticsTracker />

    {/* Tawk.to live chat */}
    <TawkChat />

    {/* Global modal */}
    <AppModal />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/security" element={<Security />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected User Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <CardServices />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Pages */}
     <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

        <Route
          path="/admin/card-applications"
          element={
            <AdminRoute>
              <CardApplications />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <AdminRoute>
              <UserDetails />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}