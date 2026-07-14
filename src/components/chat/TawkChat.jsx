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
  "https://embed.tawk.to/6a55847a550ea31d480b649a/1jtf0r0dj";

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