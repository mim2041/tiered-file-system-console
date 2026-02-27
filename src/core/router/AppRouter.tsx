import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { routes } from "../../config/routes";
import AuthLayout from "../../components/layouts/auth/AuthLayout";
import DashboardLayout from "../../components/layouts/dashboard/DashboardLayout";
// import ProtectedRoute from "./guards/ProtectedRoute";
import { Forbidden, NotFound, ServerError } from "../../app/common/errors";
import ProtectedRoute from "./guards/ProtectedRoute";

// Lazy load components for better performance
const Login = React.lazy(() => import("../../features/auth/pages/Login"));
const ForgotPassword = React.lazy(
  () => import("../../features/auth/pages/ForgotPassword")
);
const ResetPassword = React.lazy(
  () => import("../../features/auth/pages/ResetPassword")
);

// Dashboard pages
const DashboardHome = React.lazy(
  () => import("../../features/dashboard/pages/DashboardHome")
);
const Reports = React.lazy(
  () => import("../../features/dashboard/pages/Reports")
);
const Placeholder = React.lazy(
  () => import("../../features/dashboard/pages/Placeholder")
);

const AdminPackages = React.lazy(
  () => import("../../features/subscriptions/pages/AdminPackages")
);
const ApiDocs = React.lazy(
  () => import("../../features/subscriptions/pages/ApiDocs")
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spin size="large" />
    {/* <div className="mt-4 text-gray-600">Loading...</div> */}
  </div>
);

// Analytics service (placeholder)
const analyticsService = {
  trackPageView: (pathname: string) => {
    // Implement analytics tracking here
    console.log("Page view:", pathname);
  },
};

// AppRouter component handles routing with Redux state management
const AppRouter: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route
          path={routes.root}
          element={<Navigate to={routes.dashboard.root} replace />}
        />
        {/* No public legal routes */}

        {/* Authentication routes */}
        <Route path={routes.auth.root} element={<AuthLayout />}>
          <Route index element={<Navigate to={routes.auth.login} replace />} />
          <Route path={routes.auth.login} element={<Login />} />
          <Route
            path={routes.auth.forgotPassword}
            element={<ForgotPassword />}
          />
          <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
        </Route>

        {/* Dashboard routes - Protected */}
        <Route
          path={routes.dashboard.root}
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route
            path={routes.dashboard.reports}
            element={
              <ProtectedRoute requiredRole="admin">
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.placeholder}
            element={
              <ProtectedRoute requiredRole="admin">
                <Placeholder />
              </ProtectedRoute>
            }
          />
          {/* Admin and storage routes */}
          <Route
            path={routes.dashboard.admin.packages}
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPackages />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.apiDocs}
            element={
              <ProtectedRoute requiredRole="admin">
                <ApiDocs />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.admin.users}
            element={
              <ProtectedRoute requiredRole="admin">
                <Placeholder />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.admin.audits}
            element={
              <ProtectedRoute requiredRole="admin">
                <Placeholder />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.storage.folders}
            element={
              <ProtectedRoute requiredRole="admin">
                <Placeholder />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.storage.files}
            element={
              <ProtectedRoute requiredRole="admin">
                <Placeholder />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.dashboard.settings}
            element={
              <ProtectedRoute requiredRole="admin">
                <Placeholder />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Error routes */}
        <Route path={routes.errors.forbidden} element={<Forbidden />} />
        <Route path={routes.errors.serverError} element={<ServerError />} />
        <Route path={routes.errors.notFound} element={<NotFound />} />

        {/* Catch all route */}
        <Route
          path="*"
          element={<Navigate to={routes.errors.notFound} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
