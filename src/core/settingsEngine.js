// src/core/settingsEngine.js

export const defaultSettings = {
  theme: "dark",
  email: "",
  alerts: true,
};

export const loadSettings = () => {
  return JSON.parse(localStorage.getItem("settings")) || defaultSettings;
};

export const saveSettings = (settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};