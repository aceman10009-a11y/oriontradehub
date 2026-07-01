import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetails from "./pages/UserDetails";

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Home />} />
      
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* 
        TEMPORARY FIX: Removed <ProtectedRoute> wrapper to diagnose 
        why the page isn't updating or showing changes.
      */}
      <Route path="/dashboard" element={<Dashboard />} />

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
        path="/admin/user/:id"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}