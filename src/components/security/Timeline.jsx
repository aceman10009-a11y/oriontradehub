import React from "react";
import "./Timeline.css";

const steps = [
  {
    number: "01",
    title: "Account Verification",
    text: "Every new account is verified before full platform access is granted.",
  },
  {
    number: "02",
    title: "Multi-Layer Protection",
    text: "Passwords, two-factor authentication, and encrypted sessions secure every login.",
  },
  {
    number: "03",
    title: "Continuous Monitoring",
    text: "Advanced systems monitor suspicious activity 24 hours a day.",
  },
  {
    number: "04",
    title: "Cold Asset Storage",
    text: "Most customer assets remain securely stored offline for maximum protection.",
  },
];

export default function Timeline() {
  return (
    <section className="timeline-section">

      <div className="timeline-header">
        <span>SECURITY PROCESS</span>
        <h2>How Orion Protects Your Assets</h2>
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