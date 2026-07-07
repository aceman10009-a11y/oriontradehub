import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { startBinanceService } from "./services/binanceService";

startBinanceService();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        newestOnTop
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  </StrictMode>
);