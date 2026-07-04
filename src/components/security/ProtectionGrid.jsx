import { motion } from "framer-motion";
import "./ProtectionGrid.css";

const protections = [
  {
    title: "Cold Storage",
    text: "98% of digital assets remain securely stored offline to reduce exposure to online threats.",
    icon: "❄️",
  },
  {
    title: "256-bit Encryption",
    text: "Enterprise-grade encryption protects every transaction and communication.",
    icon: "🔐",
  },
  {
    title: "Two-Factor Authentication",
    text: "Additional verification ensures only authorized users can access accounts.",
    icon: "🛡️",
  },
  {
    title: "Risk Monitoring",
    text: "Continuous monitoring detects suspicious activity in real time.",
    icon: "📡",
  },
  {
    title: "Secure Infrastructure",
    text: "Hosted on resilient enterprise cloud infrastructure with multiple security layers.",
    icon: "🏛️",
  },
  {
    title: "Fraud Detection",
    text: "Automated systems help identify abnormal account behaviour before threats escalate.",
    icon: "⚡",
  },
];

export default function ProtectionGrid() {
  return (
    <section className="protection-section">
      <div className="protection-header">
        <span>SECURITY FEATURES</span>

        <h2>Multiple Layers of Protection</h2>

        <p>
          Every Orion Trade Hub account is protected by multiple independent
          security systems working together.
        </p>
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