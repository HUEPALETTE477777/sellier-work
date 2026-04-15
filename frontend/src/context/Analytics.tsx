import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// GTAG EXISTS ON THE WINDOW OBJECT
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
export {};

// HARDCODED G-ID, TRACK WHENEVER OUR LOCATION CHANGEs
// IF CHANGES, SEND NEW PATH TO GOOGLE
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