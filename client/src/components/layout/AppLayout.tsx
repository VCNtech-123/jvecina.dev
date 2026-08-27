import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="min-h-dvh bg-bg text-text">
      <Navbar />
      <main className="pb-16 pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;