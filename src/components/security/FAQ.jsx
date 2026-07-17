import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./FAQ.css";

export default function FAQ() {
  const { t } = useTranslation("security");
  const [open, setOpen] = useState(null);

  const faqData = [
    {
      q: t("faq.questions.account.question"),
      a: t("faq.questions.account.answer"),
    },
    {
      q: t("faq.questions.funds.question"),
      a: t("faq.questions.funds.answer"),
    },
    {
      q: t("faq.questions.monitoring.question"),
      a: t("faq.questions.monitoring.answer"),
    },
    {
      q: t("faq.questions.institutional.question"),
      a: t("faq.questions.institutional.answer"),
    },
  ];

  return (
    <section className="faq-section">
      <div className="faq-header">
        <span>{t("faq.badge")}</span>
        <h2>{t("faq.title")}</h2>
      </div>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${open === index ? "open" : ""}`}
            onClick={() => setOpen(open === index ? null : index)}
          >
            <div className="faq-question">
              {item.q}
              <span className="faq-toggle">
                {open === index ? "−" : "+"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}