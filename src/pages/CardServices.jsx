import React, { useState } from "react";
import orionCard from "../assets/cards/orion-card.jpg";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function CardServices() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [showApplication, setShowApplication] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cardStatus, setCardStatus] = useState("notApplied");

const submitApplication = async () => {
  if (!address.trim() || !email.trim()) {
    toast.error("Please complete all fields.");
    return;
  }

  try {
    await updateDoc(doc(db, "users", user.uid), {
      cardApplication: {
        address,
        email,
        status: "Pending Review",
        appliedAt: new Date(),
      },
    });

    setCardStatus("pending");
    setShowApplication(false);

    toast.success(
      "Your Orion Debit Card application has been received. Please make payment of 10 percent of total profit externally through your assigned trader."
    );

    setAddress("");
    setEmail("");
  } catch (err) {
    console.error(err);
    toast.error("Unable to submit application.");
  }
};

return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
        color: "var(--text-primary)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "10px",
        }}
      >
        {t("cardServices.title")}
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "30px",
        }}
      >
        {t("cardServices.description")}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
        }}
      >
        {/* Card Preview */}

        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h2>{t("cardServices.preview")}</h2>

          <div
            style={{
              marginTop: "20px",
              borderRadius: "18px",
              overflow: "hidden",
            }}
          >
            <img
              src={orionCard}
              alt={t("cardServices.title")}
              style={{
                width: "100%",
                maxWidth: "520px",
                display: "block",
                margin: "20px auto",
                borderRadius: "18px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Card Status */}

        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            borderRadius: "18px",
            padding: "25px",
          }}
        >
          <h2>{t("cardServices.status")}</h2>

          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              borderRadius: "12px",
              background: "#1f2937",
              border: "1px solid var(--border-color)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#9ca3af",
                marginBottom: "8px",
              }}
            >
              {t("cardServices.applicationStatus")}
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#fbbf24",
              }}
            >
              {t(`cardServices.${cardStatus}`)}
            </div>
          </div>

          <button
            onClick={() => setShowApplication(true)}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: "#1199fa",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {t("cardServices.applyButton")}
          </button>
        </div>
      </div>

      {/* Benefits */}

      <div
        style={{
          marginTop: "35px",
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "18px",
          padding: "25px",
        }}
      >
        <h2>{t("cardServices.benefits")}</h2>

        <ul
          style={{
            marginTop: "20px",
            lineHeight: "2",
          }}
        >
          <li>{t("cardServices.benefitWorldwide")}</li>
          <li>{t("cardServices.benefitAtm")}</li>
          <li>{t("cardServices.benefitContactless")}</li>
          <li>{t("cardServices.benefitChip")}</li>
          <li>{t("cardServices.benefitFraud")}</li>
          <li>{t("cardServices.benefitSupport")}</li>
        </ul>
      </div>

      {showApplication && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "95%",
              maxWidth: "520px",
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              borderRadius: "18px",
              padding: "30px",
            }}
          >
            <h2>{t("cardServices.applyButton")}</h2>

            <input
              type="text"
              placeholder={t("cardServices.houseAddress")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "20px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                boxSizing: "border-box",
              }}
            />

            <input
              type="email"
              placeholder={t("cardServices.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "15px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => setShowApplication(false)}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#555",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {t("cancel")}
              </button>
              <button
  onClick={submitApplication}
  style={{
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#1199fa",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  {t("submit")}
</button>

           
            </div>
          </div>
        </div>
      )}
    </div>
  );
}