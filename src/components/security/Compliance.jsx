import React from "react";
import "./Compliance.css";

const items = [
  {
    title: "AML Monitoring",
    text: "Continuous anti-money laundering monitoring helps identify suspicious activity.",
  },
  {
    title: "KYC Verification",
    text: "Identity verification protects both users and the integrity of the platform.",
  },
  {
    title: "Data Protection",
    text: "Sensitive customer information is encrypted and securely managed.",
  },
  {
    title: "Risk Controls",
    text: "Automated security systems continuously assess account behaviour and potential threats.",
  },
];

export default function Compliance() {
  return (
    <section className="compliance-section">

      <div className="compliance-header">

        <span>TRUST & COMPLIANCE</span>

        <h2>Built Around Security Standards</h2>

        <p>
          Orion Trade Hub follows modern security practices designed to protect
          customer accounts, personal information, and digital assets.
        </p>

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