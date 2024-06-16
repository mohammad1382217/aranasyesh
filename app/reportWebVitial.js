// reportWebVitals.js
import { onCLS, onINP, onLCP, onFCP, onTTFB } from "web-vitals/attribution";

const reportWebVitals = () => {
  onCLS();
  onINP();
  onLCP();
  onFCP();
  onTTFB();
};

export default reportWebVitals;
