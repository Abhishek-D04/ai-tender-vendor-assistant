import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}