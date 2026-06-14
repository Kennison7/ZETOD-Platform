import { useEffect } from "react";

export default function ColdStartNotice({ visible }) {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL || "https://zetod-backend.onrender.com/health", {
      method: "GET",
    }).catch(() => {});
  }, []);

  return null;
}
