import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, key]);

  return null;
};

export const ScrollToBottom = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    const height = document.documentElement.scrollHeight;
    window.scrollTo({ top: height, behavior: "instant" });
  }, [pathname, key]);

  return null;
};
