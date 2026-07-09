import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminShell from "./components/admin/AdminShell";
import CategoriesAdminPage from "./pages/admin/CategoriesAdminPage";
import DashboardPage from "./pages/admin/DashboardPage";
import LoginPage from "./pages/admin/LoginPage";
import ProductsAdminPage from "./pages/admin/ProductsAdminPage";
import ProfilePage from "./pages/admin/ProfilePage";
import SettingsAdminPage from "./pages/admin/SettingsAdminPage";
import AboutPage from "./pages/public/AboutPage";
import CategoriesPage from "./pages/public/CategoriesPage";
import ContactPage from "./pages/public/ContactPage";
import HomePage from "./pages/public/HomePage";
import NotFoundPage from "./pages/public/NotFoundPage";
import ProductDetailsPage from "./pages/public/ProductDetailsPage";
import ProductsPage from "./pages/public/ProductsPage";

function ProtectedAdmin() {
  const isAuthed = localStorage.getItem("design-point-admin") === "true";
  return isAuthed ? <AdminShell /> : <Navigate to="/admin/login" replace />;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<ProtectedAdmin />}>
        <Route index element={<DashboardPage />} />
        <Route path="categories" element={<CategoriesAdminPage />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="settings" element={<SettingsAdminPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:slug" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PublicLayout>
        }
      />
    </Routes>
  );
}
