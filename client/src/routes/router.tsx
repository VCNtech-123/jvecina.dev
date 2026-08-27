import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./ui/AppLayout";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthProvider } from "../state/AuthProvider";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:slug", element: <ProjectDetailPage /> },
      { path: "/contact", element: <ContactPage /> },

      { path: "/admin/login", element: <AdminLoginPage /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);