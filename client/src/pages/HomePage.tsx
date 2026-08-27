
import HomeHero from "../components/home/HomeHero";
import ProjectsPage from "./ProjectsPage";
import TechStackSection from "../components/home/TechStack";

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <ProjectsPage />
      <TechStackSection />
    </>
  );
};

export default HomePage;