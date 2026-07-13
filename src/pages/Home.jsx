import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();



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

      <section id="orioncoin">
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
          <h2>{t("homeInfo.about.title")}</h2>

          <p
            style={{
              color: "#aaa",
              maxWidth: "700px",
              margin: "20px auto",
            }}
          >
         {t("homeInfo.about.description")}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;