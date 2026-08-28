
import HomeHero from "../components/home/HomeHero";
import ProjectsPage from "./ProjectsPage";
import TechStackSection from "../components/home/HomeTechStack";
import HomeContactSection from "../components/home/HomeContactSection";
import HomeAboutSection from "../components/home/HomeAboutSection"

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <ProjectsPage />
      <TechStackSection />
      <HomeAboutSection />
      <HomeContactSection />
    </>
  );
};

export default HomePage;