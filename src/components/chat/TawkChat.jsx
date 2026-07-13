import { useEffect } from "react";

const TawkChat = () => {
  useEffect(() => {
    if (document.getElementById("tawk-script")) {
      return;
    }

    const script = document.createElement("script");

    script.id = "tawk-script";
    script.async = true;
    script.src =
      "https://embed.tawk.to/6a54ec54f8151e1d4a16991b/1jtdrmajn";

    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("tawk-script");

      if (existing) {
        existing.remove();
      }
    };
  }, []);

  return null;
};

export default TawkChat;