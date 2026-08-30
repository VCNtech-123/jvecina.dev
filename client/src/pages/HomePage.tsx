import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomeHero from "../components/home/HomeHero";
import HomeProjectsSection from "./ProjectsPage";
import TechStackSection from "../components/home/HomeTechStack";
import AboutSection from "../components/home/HomeAboutSection";
import HomeContactSection from "../components/home/HomeContactSection";

type LocationState = { scrollTo?: string };

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as LocationState | null;
    const id = state?.scrollTo;
    if (!id) return;

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

    navigate(".", { replace: true, state: null });
  }, [location.key, location.state, navigate]);

  return (
    <>
      <HomeHero />
      <HomeProjectsSection />
      <TechStackSection />
      <AboutSection />
      <HomeContactSection />
    </>
  );
};

export default HomePage;