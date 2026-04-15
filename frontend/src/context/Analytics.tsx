import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
export {};

const Analytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-18G6Y9GNLJ", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null; 
};

export default Analytics;