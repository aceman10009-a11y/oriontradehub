import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    label: "Encryption",
    value: "256-bit",
    desc: "End-to-end encrypted infrastructure",
  },
  {
    label: "Uptime",
    value: "99.99%",
    desc: "Continuous platform availability",
  },
  {
    label: "Monitoring",
    value: "24/7",
    desc: "Real-time security surveillance",
  },
  {
    label: "Protection",
    value: "Multi-Layer",
    desc: "Advanced risk defense system",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="security-stats" ref={ref}>
      <div className="stats-container">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="stats-card"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ scale: 1.03 }}
          >
            <h2>{item.value}</h2>
            <h4>{item.label}</h4>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}