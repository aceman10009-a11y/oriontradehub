import React from "react";
import { useTranslation } from "react-i18next";
import "./Timeline.css";

export default function Timeline() {
  const { t } = useTranslation("security");

  const steps = [
    {
      number: "01",
      title: t("timeline.steps.0.title"),
      text: t("timeline.steps.0.text"),
    },
    {
      number: "02",
      title: t("timeline.steps.1.title"),
      text: t("timeline.steps.1.text"),
    },
    {
      number: "03",
      title: t("timeline.steps.2.title"),
      text: t("timeline.steps.2.text"),
    },
    {
      number: "04",
      title: t("timeline.steps.3.title"),
      text: t("timeline.steps.3.text"),
    },
  ];

  return (
    <section className="timeline-section">
      <div className="timeline-header">
        <span>{t("timeline.badge")}</span>
        <h2>{t("timeline.title")}</h2>
      </div>

      <div className="timeline-grid">
        {steps.map((step) => (
          <div className="timeline-card" key={step.number}>
            <div className="timeline-number">{step.number}</div>

            <h3>{step.title}</h3>

            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}