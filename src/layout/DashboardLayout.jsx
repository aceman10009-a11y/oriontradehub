import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#060809",
        color: "#fff",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;