import React from "react";

const reviews = [
  { name: "Michael R.", country: "Canada", text: "Very smooth platform. Real-time pricing feels professional." },
  { name: "Sarah L.", country: "UK", text: "Clean UI and fast execution. Love the trading experience." },
  { name: "Daniel K.", country: "Germany", text: "Charts are responsive and accurate. Great work." },
  { name: "Sofia M.", country: "Spain", text: "Feels like a real exchange. Very impressive design." },
  { name: "James T.", country: "Australia", text: "Simple, fast, and reliable trading interface." },
  { name: "Emma H.", country: "Sweden", text: "One of the best demo trading platforms I've used." },
  { name: "Ahmed A.", country: "UAE", text: "Execution speed and UI are top tier." },
  { name: "David C.", country: "Singapore", text: "Very realistic trading environment." },
  { name: "Grace O.", country: "Portugal", text: "Finally a clean crypto trading UI that feels real." },
  { name: "Olivia W.", country: "USA", text: "Love the live market feel. Very polished." },
];

const Reviews = () => {
  return (
    <section
      id="reviews"
      style={{
        padding: "100px 20px",
        background: "#050608",
        color: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "50px" }}>
        What Traders Are Saying
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.04)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
           <div
  style={{
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
    marginBottom: "4px",
  }}
>
  {r.name}
</div>

<small style={{ color: "#aaa" }}>{r.country}</small>

<p style={{ marginTop: "10px", color: "#cbd5e1" }}>
  "{r.text}"
</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;