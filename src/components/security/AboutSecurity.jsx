import React from "react";
import { useTranslation } from "react-i18next";

const sectionStyle = {
  background: "#05070b",
  color: "#e6edf7",
  padding: "100px 20px",
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const cardStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "35px",
  marginBottom: "35px",
};

export default function AboutSecurity() {

  const { t } = useTranslation("security");

  const sections = t("aboutSecurity.sections", {
    returnObjects: true,
  });

  return (
    <section id="about" style={sectionStyle}>

      <div style={containerStyle}>

        <h2>
          {t("aboutSecurity.title")}
        </h2>

        <p>
          {t("aboutSecurity.intro")}
        </p>


        {sections.map((section, index) => (

          <div 
            style={cardStyle}
            key={index}
          >

            <h3>
              {section.title}
            </h3>

            <p>
              {section.text}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}