import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import "./locales/i18n";
import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { startBinanceService } from "./services/binanceService";

startBinanceService();

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "Light") {
  document.body.style.background = "#f5f7fb";
  document.body.style.color = "#111";
} else if (savedTheme === "Dark") {
  document.body.style.background = "#0b0f14";
  document.body.style.color = "#fff";
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          newestOnTop
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);