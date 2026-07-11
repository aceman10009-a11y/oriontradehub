import React from "react";
import { useTranslation } from "react-i18next";
import FeatureCard from "./FeatureCard";

const FeatureGrid = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: "💎",
      title: t("features.cards.vip.title"),
      description: t("features.cards.vip.description"),
      accent: "#20a4ff",
    },
    {
      icon: "📈",
      title: t("features.cards.ai.title"),
      description: t("features.cards.ai.description"),
      accent: "#00c57d",
    },
    {
      icon: "⚡",
      title: t("features.cards.execution.title"),
      description: t("features.cards.execution.description"),
      accent: "#20a4ff",
    },
    {
      icon: "🔐",
      title: t("features.cards.security.title"),
      description: t("features.cards.security.description"),
      accent: "#00c57d",
    },
    {
      icon: "🌍",
      title: t("features.cards.assets.title"),
      description: t("features.cards.assets.description"),
      accent: "#20a4ff",
    },
    {
      icon: "💼",
      title: t("features.cards.portfolio.title"),
      description: t("features.cards.portfolio.description"),
      accent: "#00c57d",
    },
  ];

  return (
    <>
      <style>{`
        .feature-grid{

          display:grid;

          grid-template-columns:
          repeat(auto-fit,minmax(280px,1fr));

          gap:28px;

          width:100%;

        }

        @media(max-width:768px){

          .feature-grid{

            grid-template-columns:1fr;

            gap:22px;

          }

        }
      `}</style>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            accent={feature.accent}
          />
        ))}
      </div>
    </>
  );
};

export default FeatureGrid;