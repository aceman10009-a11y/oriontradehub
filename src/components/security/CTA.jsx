import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const CTA = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sending) return; // prevent double submit

    setSending(true);

    emailjs
      .sendForm(
        "service_3d4p7ci",
        "template_w7xmy3e",
        formRef.current,
        "6sEG7U1PtrHRYzUwD"
      )
      .then(() => {
        alert("Message sent successfully!");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Failed to send message.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section id="support" className="cta-section">
      <div className="cta-buttons">
        <button
          className="cta-primary"
          onClick={() => navigate("/signup")}
        >
          Start Trading
        </button>
      </div>

      <div className="support-form">
        <h3>Contact Support</h3>

        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder="Full Name"
            required
            disabled={sending}
          />

          <input
            type="email"
            name="user_email"
            placeholder="Email Address"
            required
            disabled={sending}
          />

          <textarea
            name="message"
            placeholder="How can we help?"
            rows="5"
            required
            disabled={sending}
          />

          <button type="submit" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTA;