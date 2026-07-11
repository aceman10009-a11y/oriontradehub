import React from "react";
import { useTranslation } from "react-i18next";

const Reviews = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      name: "Michael R.",
      country: "Canada",
      text: t("reviews.items.0"),
    },
    {
      name: "Sarah L.",
      country: "UK",
      text: t("reviews.items.1"),
    },
    {
      name: "Daniel K.",
      country: "Germany",
      text: t("reviews.items.2"),
    },
    {
      name: "Sofia M.",
      country: "Spain",
      text: t("reviews.items.3"),
    },
    {
      name: "James T.",
      country: "Australia",
      text: t("reviews.items.4"),
    },
    {
      name: "Emma H.",
      country: "Sweden",
      text: t("reviews.items.5"),
    },
    {
      name: "Ahmed A.",
      country: "UAE",
      text: t("reviews.items.6"),
    },
    {
      name: "David C.",
      country: "Singapore",
      text: t("reviews.items.7"),
    },
    {
      name: "Grace O.",
      country: "Portugal",
      text: t("reviews.items.8"),
    },
    {
      name: "Olivia W.",
      country: "USA",
      text: t("reviews.items.9"),
    },
  ];

  return (
    <section
      id="reviews"
      style={{
        padding: "100px 20px",
        background: "#050608",
        color: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        {t("reviews.title")}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: "16px",
                marginBottom: "4px",
              }}
            >
              {r.name}
            </div>

            <small style={{ color: "#aaa" }}>
              {r.country}
            </small>

            <p
              style={{
                marginTop: "10px",
                color: "#cbd5e1",
              }}
            >
              "{r.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;