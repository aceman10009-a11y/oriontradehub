import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

import { trackPageView } from "./services/analytics";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AppModal from "./components/AppModal";
import TawkChat from "./components/chat/TawkChat";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Security = lazy(() => import("./pages/Security"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Settings = lazy(() => import("./pages/Settings"));
const CardServices = lazy(() => import("./pages/CardServices"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const CardApplications = lazy(() => import("./pages/admin/CardApplications"));

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

    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#070b16",
            color: "#fff",
            fontSize: "18px",
          }}
        >
          Loading...
        </div>
      }
    >
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
    </Suspense>
  </>
);
}