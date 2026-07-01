import React from "react";
import HeroText from "./HeroText";
import DownloadButtons from "./DownloadButtons";

const HeroContent = () => {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 5,
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "120px 20px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <HeroText />

      <div style={{ marginTop: "40px" }}>
        <DownloadButtons />
      </div>
    </div>
  );
};

export default HeroContent;