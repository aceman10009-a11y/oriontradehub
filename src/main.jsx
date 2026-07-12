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
import { startTwelveDataService } from "./services/twelveDataService";


// Start live market services
startBinanceService();
startTwelveDataService();


// Apply saved theme before rendering
const savedTheme = localStorage.getItem("theme") || "Dark";

document.documentElement.setAttribute(
  "data-theme",
  savedTheme
);


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