/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import About from "./pages/About";
import AllJobs from "./pages/AllJobs";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import CandidatesLogin from "./pages/CandidatesLogin";
import CandidatesSignup from "./pages/CandidatesSignup";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import Dashborad from "./pages/Dashborad";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import { AppContext } from "./context/AppContext";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Capabilitites from "./pages/Capabilitites";
import { ProtectedRoute, CompanyProtectedRoute } from "./components/ProtectedRoute";

// Import admin pages (create these next)
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageUsers from "./pages/admin/ManageUsers";
// import AdminReports from "./pages/admin/AdminReports";

const App = () => {
  const { companyToken } = useContext(AppContext);

  return (
    <AppLayout>
      <Routes>
        {/* ========================================
            PUBLIC ROUTES (No authentication needed)
        ======================================== */}
        <Route path="/" element={<Home />} />
        <Route path="/all-jobs/:category" element={<AllJobs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/capabilitites" element={<Capabilitites />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth routes - should redirect if already logged in */}
        <Route path="/candidate-login" element={<CandidatesLogin />} />
        <Route path="/candidate-signup" element={<CandidatesSignup />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />

        {/* ========================================
            USER PROTECTED ROUTES
            (Requires login, blocks admin)
        ======================================== */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute requireUser={true}>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/apply-job/:id" 
          element={
            <ProtectedRoute requireUser={true}>
              <ApplyJob />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/applications" 
          element={
            <ProtectedRoute requireUser={true}>
              <Applications />
            </ProtectedRoute>
          } 
        />

        {/* ========================================
            ADMIN PROTECTED ROUTES
            (Requires admin privileges)
        ======================================== */}
        {/* Uncomment these when you create the admin pages
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <ManageUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminReports />
            </ProtectedRoute>
          } 
        />
        */}

        {/* ========================================
            COMPANY/RECRUITER PROTECTED ROUTES
            (Requires company login)
        ======================================== */}
        <Route 
          path="/dashboard" 
          element={
            <CompanyProtectedRoute>
              <Dashborad />
            </CompanyProtectedRoute>
          }
        >
          <Route path="add-job" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>

        {/* ========================================
            404 NOT FOUND ROUTE (Optional)
        ======================================== */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page not found</p>
                <a 
                  href="/" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Go Home
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </AppLayout>
  );
};

export default App;