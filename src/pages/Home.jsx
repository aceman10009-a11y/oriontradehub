import React, { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MobileShowcase from "../components/MobileShowcase";
import SecurityMobile from "../components/SecurityMobile";
import Markets from "../components/Markets";
import Features from "../components/Features";
import OrionCoin from "../components/OrionCoin";
import Contact from "../components/Contact";
import Reviews from "../components/Reviews";
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

      {/* CRITICAL FIX: anchor targets for navbar scroll */}
      <section id="features">
        <Features />
      </section>

      <section id="markets">
        <Markets />
      </section>

      <section id="mobile-app">
        <MobileShowcase />
      </section>

      <section id="security">
        <SecurityMobile />
      </section>

      <section id="orion-coin">
        <OrionCoin />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="contact">
        <Contact />
      </section>
      
      <section id="about">
        <div style={{ padding: "100px 20px", textAlign: "center" }}>
          <h2>About Orion Trade Hub</h2>
          <p style={{ color: "#aaa", maxWidth: "700px", margin: "20px auto" }}>
            Orion Trade Hub is a next-generation trading platform designed for
            real-time market execution, AI-assisted insights, and institutional-grade
            performance across crypto, forex, and global markets.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;