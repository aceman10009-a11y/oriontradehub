import React from "react";
import { useTranslation } from "react-i18next";
import "./Compliance.css";

export default function Compliance() {
  const { t } = useTranslation("security");

  const items = [
    {
      title: t("compliance.cards.aml.title"),
      text: t("compliance.cards.aml.description"),
    },
    {
      title: t("compliance.cards.kyc.title"),
      text: t("compliance.cards.kyc.description"),
    },
    {
      title: t("compliance.cards.dataProtection.title"),
      text: t("compliance.cards.dataProtection.description"),
    },
    {
      title: t("compliance.cards.riskControls.title"),
      text: t("compliance.cards.riskControls.description"),
    },
  ];

  return (
    <section className="compliance-section">
      <div className="compliance-header">
        <span>{t("compliance.badge")}</span>

        <h2>{t("compliance.title")}</h2>

        <p>{t("compliance.description")}</p>
      </div>

      <div className="compliance-grid">
        {items.map((item) => (
          <div className="compliance-card" key={item.title}>
            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}