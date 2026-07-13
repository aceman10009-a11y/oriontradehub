import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./pages/UserDetails";
import AppModal from "./components/AppModal";
import Security from "./pages/Security";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Settings from "./pages/Settings";
import CardServices from "./pages/CardServices";
import CardApplications from "./pages/admin/CardApplications";

export default function App() {
  return (
    <>
      {/* GLOBAL MODAL (IMPORTANT: must be outside Routes) */}
      <AppModal />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/security" element={<Security />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

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

        {/* Protected Admin Dashboards */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/card-applications"
          element={
            <ProtectedRoute>
              <CardApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}