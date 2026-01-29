import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LoaderCircle } from 'lucide-react';

export const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }) => {
  const { isLogin, isAdmin, userDataLoading, isCompanyLogin } = useContext(AppContext);
  const location = useLocation();

  // Show loading state while checking authentication
  if (userDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Admin route protection
  if (requireAdmin) {
    if (!isLogin) {
      return <Navigate to="/candidate-login" state={{ from: location }} replace />;
    }
    if (!isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page. Admin privileges are required.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // Regular user route protection
  if (requireUser) {
    if (!isLogin) {
      return <Navigate to="/candidate-login" state={{ from: location }} replace />;
    }
    // Prevent admin from accessing user-only routes
    if (isAdmin) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Account</h2>
            <p className="text-gray-600 mb-6">
              This feature is not available for administrator accounts.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return children;
};

export const CompanyProtectedRoute = ({ children }) => {
  const { isCompanyLogin, companyLoading } = useContext(AppContext);
  const location = useLocation();

  if (companyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verifying company access...</p>
        </div>
      </div>
    );
  }

  if (!isCompanyLogin) {
    return <Navigate to="/recruiter-login" state={{ from: location }} replace />;
  }

  return children;
};