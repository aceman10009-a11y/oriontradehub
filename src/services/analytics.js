import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-RHFTT8M50D";

export const initializeAnalytics = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};