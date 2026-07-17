import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ProtectionGrid.css";

export default function ProtectionGrid() {
  const { t } = useTranslation("security");

  const protections = [
    {
      title: t("protectionGrid.cards.coldStorage.title"),
      text: t("protectionGrid.cards.coldStorage.description"),
      icon: "❄️",
    },
    {
      title: t("protectionGrid.cards.encryption.title"),
      text: t("protectionGrid.cards.encryption.description"),
      icon: "🔐",
    },
    {
      title: t("protectionGrid.cards.twoFactor.title"),
      text: t("protectionGrid.cards.twoFactor.description"),
      icon: "🛡️",
    },
    {
      title: t("protectionGrid.cards.monitoring.title"),
      text: t("protectionGrid.cards.monitoring.description"),
      icon: "📡",
    },
    {
      title: t("protectionGrid.cards.infrastructure.title"),
      text: t("protectionGrid.cards.infrastructure.description"),
      icon: "🏛️",
    },
    {
      title: t("protectionGrid.cards.fraud.title"),
      text: t("protectionGrid.cards.fraud.description"),
      icon: "⚡",
    },
  ];

  return (
    <section className="protection-section">
      <div className="protection-header">
        <span>{t("protectionGrid.badge")}</span>

        <h2>{t("protectionGrid.title")}</h2>

        <p>{t("protectionGrid.description")}</p>
      </div>

      <div className="protection-grid">
        {protections.map((item, index) => (
          <motion.div
            key={item.title}
            className="protection-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            <div className="card-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}