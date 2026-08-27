// client/src/components/layout/AppLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";
import ScrollToTop from "./scrollToTop";

const AppLayout = () => {
  return (
    <div className="min-h-dvh bg-bg text-text">
      <ScrollToTop />
      <Navbar />
      <main className="pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;