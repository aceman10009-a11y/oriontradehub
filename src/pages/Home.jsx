import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MobileShowcase from "../components/MobileShowcase";
import Features from "../components/Features";
import OrionCoin from "../components/OrionCoin";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {

  useEffect(() => {

    const existing = document.getElementById("hs-script-loader");

    if (!existing) {

      const script = document.createElement("script");

      script.id = "hs-script-loader";

      script.async = true;

      script.defer = true;

      script.src = "//js-eu1.hs-scripts.com/148809611.js";

      document.body.appendChild(script);

    }

  }, []);

  return (

    <main
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#05070b",
        color: "#fff",
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
        backgroundImage:
          "linear-gradient(rgba(5,7,11,.78),rgba(5,7,11,.94)),url('/assets/orion-constellation-bg.png')",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >

      <Navbar />

      <Hero />

      <MobileShowcase />

      <Features />

      <OrionCoin />

      <Contact />

      <Footer />

    </main>

  );

};

export default Home;