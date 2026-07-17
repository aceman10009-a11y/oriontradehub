import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

const CTA = () => {
  const { t } = useTranslation("security");

  const formRef = useRef();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sending) return;

    setSending(true);

    emailjs
      .sendForm(
        "service_3d4p7ci",
        "template_w7xmy3e",
        formRef.current,
        "6sEG7U1PtrHRYzUwD"
      )
      .then(() => {
        alert(t("cta.alerts.success"));
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert(t("cta.alerts.error"));
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
          {t("cta.startTrading")}
        </button>
      </div>

      <div className="support-form">
        <h3>{t("cta.contactSupport")}</h3>

        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder={t("cta.fullName")}
            required
            disabled={sending}
          />

          <input
            type="email"
            name="user_email"
            placeholder={t("cta.emailAddress")}
            required
            disabled={sending}
          />

          <textarea
            name="message"
            placeholder={t("cta.messagePlaceholder")}
            rows="5"
            required
            disabled={sending}
          />

          <button type="submit" disabled={sending}>
            {sending
              ? t("cta.sending")
              : t("cta.sendMessage")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTA;