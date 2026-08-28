
import HomeHero from "../components/home/HomeHero";
import ProjectsPage from "./ProjectsPage";
import TechStackSection from "../components/home/HomeTechStack";
import HomeContactSection from "../components/home/HomeContactSection";

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <ProjectsPage />
      <TechStackSection />
      <HomeContactSection />
    </>
  );
};

export default HomePage;