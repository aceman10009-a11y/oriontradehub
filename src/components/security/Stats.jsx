import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import "./Stats.css";

export default function Stats() {

  const { t } = useTranslation();

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });


  const stats = [
    {
      key: "encryption",
    },
    {
      key: "uptime",
    },
    {
      key: "monitoring",
    },
    {
      key: "protection",
    },
  ];


  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 30,
    },

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


  return (
    <section 
      className="security-stats" 
      ref={ref}
    >

      <div className="stats-container">

        {stats.map((item, i) => (

          <motion.div
            key={item.key}
            className="stats-card"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.03,
            }}
          >

            <h2>
              {t(`stats.${item.key}.value`)}
            </h2>


            <h4>
              {t(`stats.${item.key}.label`)}
            </h4>


            <p>
              {t(`stats.${item.key}.description`)}
            </p>


          </motion.div>

        ))}

      </div>

    </section>
  );
}