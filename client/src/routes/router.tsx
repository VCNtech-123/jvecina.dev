import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/:slug", element: <ProjectDetailPage /> },
    ],
  },
]);

export default router;