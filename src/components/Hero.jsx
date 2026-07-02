import React from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import FloatingStats from "./FloatingStats";

const Hero = () => {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050608",
      }}
    >
      {/* Background Layer */}
      <HeroBackground />

      {/* Main Hero Content */}
      <HeroContent />

      {/* Floating Market Cards */}
      <FloatingStats />
    </section>
  );
};

export default Hero;