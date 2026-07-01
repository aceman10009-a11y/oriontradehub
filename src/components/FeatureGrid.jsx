import React from "react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "💎",
    title: "VIP Accounts",
    description:
      "Premium execution, institutional pricing and dedicated relationship managers.",
    accent: "#20a4ff",
  },
  {
    icon: "📈",
    title: "AI Insights",
    description:
      "Real-time market intelligence powered by advanced trading algorithms.",
    accent: "#00c57d",
  },
  {
    icon: "⚡",
    title: "Fast Execution",
    description:
      "Ultra-low latency infrastructure for rapid order execution worldwide.",
    accent: "#20a4ff",
  },
  {
    icon: "🔐",
    title: "Secure Platform",
    description:
      "Enterprise-grade encryption and multi-layer account protection.",
    accent: "#00c57d",
  },
  {
    icon: "🌍",
    title: "Multi-Asset Trading",
    description:
      "Trade crypto, forex, commodities, indices and equities from one account.",
    accent: "#20a4ff",
  },
  {
    icon: "💼",
    title: "Managed Portfolios",
    description:
      "Professional portfolio management with institutional risk controls.",
    accent: "#00c57d",
  },
];

const FeatureGrid = () => {
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