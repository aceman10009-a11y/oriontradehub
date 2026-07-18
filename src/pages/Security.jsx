import React from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/security/Hero";
import Stats from "../components/security/Stats";
import ProtectionGrid from "../components/security/ProtectionGrid";
import Timeline from "../components/security/Timeline";
import Compliance from "../components/security/Compliance";
import FAQ from "../components/security/FAQ";
import AboutSecurity from "../components/security/AboutSecurity";
import CTA from "../components/security/CTA";

const Security = () => {
  // Load security translations for this page
  useTranslation("security");

  return (
    <main
      style={{
        minHeight: "100vh",
        overflowX: "hidden",
        background: "#05070b",
        color: "#ffffff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Navbar />

      <Hero />
      <Stats />
      <ProtectionGrid />
      <Timeline />
      <Compliance />
      <FAQ />
      <AboutSecurity />
      <CTA />

      <Footer />
    </main>
  );
};

export default Security;