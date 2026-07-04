import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    q: "Is my account secure?",
    a: "Yes. Every account is protected by multi-layer security including encryption, 2FA, and continuous monitoring.",
  },
  {
    q: "Where are funds stored?",
    a: "98% of digital assets are stored in cold wallets, completely offline and protected from online threats.",
  },
  {
    q: "How does risk monitoring work?",
    a: "Our systems analyze behavior in real time to detect and prevent suspicious activity before it becomes a threat.",
  },
  {
    q: "Do you support institutional clients?",
    a: "Yes. Orion Trade Hub is built with institutional-grade infrastructure for high-volume and professional trading.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq-section">

      <div className="faq-header">
        <span>HELP CENTER</span>
        <h2>Frequently Asked Questions</h2>
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