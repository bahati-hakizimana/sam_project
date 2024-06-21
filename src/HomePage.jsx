import AOS from "aos";
import "aos/dist/aos.css";
import React,{useEffect} from "react";

// Component import
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import About from "./components/about/About.jsx";
import Contact from "./components/contact/Contact.jsx";


const HomePage = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Navbar  />
      <Hero  />
      {/* <BrandsLogo handleLoginPopup={handleLoginPopup} /> */}
      <About  />
      <Contact  />
      
      <Footer  />

    </div>
  );
};

export default HomePage;