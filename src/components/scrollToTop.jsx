import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can remove this if you want an instant jump
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
