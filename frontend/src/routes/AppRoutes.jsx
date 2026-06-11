import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import TenderPage from "../pages/TenderPage";
import TenderDetailsPage from "../pages/TenderDetailsPage";

import VendorPage from "../pages/VendorPage";
import VendorComparisonPage from "../pages/VendorComparisonPage";

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

      <Route
  path="/tenders/details"
  element={
    <MainLayout>
      <TenderDetailsPage />
    </MainLayout>
  }
/>


       <Route
  path="/tenders"
  element={
    <MainLayout>
      <TenderPage />
    </MainLayout>
  }
/>

<Route
  path="/vendors"
  element={
    <MainLayout>
      <VendorPage />
    </MainLayout>
  }
/>

<Route
  path="/vendors/comparison"
  element={
    <MainLayout>
      <VendorComparisonPage />
    </MainLayout>
  }
/>

      
    </Routes>


  );
}